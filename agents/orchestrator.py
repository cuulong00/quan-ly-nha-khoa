#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import urllib.error
import argparse

# Khởi tạo argparse để nhận đầu vào từ CLI
parser = argparse.ArgumentParser(description="Mô phỏng quy trình làm việc Multi-Agent cho Dental Clinic Manager")
parser.add_argument("--task", type=str, required=True, help="Yêu cầu hoặc tính năng cần triển khai")
parser.add_argument("--model", type=str, default="gemini-1.5-flash", help="Model Gemini sử dụng")
args = parser.parse_args()

# Thư mục chứa các tệp
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PERSONAS_DIR = os.path.join(BASE_DIR, "personas")
OUTPUTS_DIR = os.path.join(BASE_DIR, "outputs")

# Tạo thư mục đầu ra nếu chưa có
os.makedirs(OUTPUTS_DIR, exist_ok=True)

# Lấy API Key từ môi trường
API_KEY = os.environ.get("GEMINI_API_KEY")

if not API_KEY:
    # Thử tìm trong file .env ở gốc dự án
    env_path = os.path.join(os.path.dirname(BASE_DIR), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GEMINI_API_KEY="):
                    API_KEY = line.strip().split("=", 1)[1].strip('"').strip("'")
                    break

# Hàm gọi Gemini API qua urllib (Không phụ thuộc thư viện ngoài)
def call_gemini(system_instruction, prompt, model=args.model):
    if not API_KEY:
        print("\n[LỖI] Không tìm thấy GEMINI_API_KEY trong môi trường hoặc tệp .env.")
        print("Vui lòng cấu hình API Key: export GEMINI_API_KEY=\"your_key_here\"")
        sys.exit(1)

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
    payload = {
        "systemInstruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2
        }
    }
    
    headers = {"Content-Type": "application/json"}
    req = urllib.request.Request(
        url, 
        data=json.dumps(payload).encode("utf-8"), 
        headers=headers, 
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["candidates"][0]["content"]["parts"][0]["text"]
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8")
        print(f"\n[HTTP Error {e.code}]: {error_msg}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[Lỗi kết nối]: {str(e)}")
        sys.exit(1)

# Đọc file system instruction của từng Agent
def read_persona(filename):
    path = os.path.join(PERSONAS_DIR, filename)
    if not os.path.exists(path):
        print(f"[CẢNH BÁO] Không tìm thấy tệp persona tại {path}. Dùng cấu hình trống.")
        return ""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def main():
    print("=" * 60)
    print(" KHỞI CHẠY QUY TRÌNH MULTI-AGENT COLLABORATION (SOP)")
    print("=" * 60)
    print(f"Yêu cầu đầu vào: '{args.task}'\n")

    # Đọc chỉ dẫn hệ thống cho từng vai trò
    si_ba = read_persona("BusinessAnalyst.md")
    si_ds = read_persona("DentalSpecialist.md")
    si_dev = read_persona("Developer.md")
    si_qa = read_persona("QATester.md")

    # -------------------------------------------------------------
    # VÒNG LẶP BA <-> DENTAL SPECIALIST (Phản biện Y khoa)
    # -------------------------------------------------------------
    print("--- [BẮT ĐẦU VÒNG LẶP PHẢN BIỆN: BA & DENTAL SPECIALIST] ---")
    prd_output = ""
    medical_review = ""
    max_loops = 3
    
    for loop in range(1, max_loops + 1):
        print(f"\n[Vòng {loop}] BA Agent đang soạn thảo đặc tả PRD...")
        if loop == 1:
            # Cố tình đưa lỗi lâm sàng ở vòng 1 để chứng minh vòng lặp hoạt động
            prompt_ba = (
                f"Hãy đóng vai trò BA, tiếp nhận yêu cầu sau từ Bác sĩ: '{args.task}'. "
                f"Phân tích và viết đặc tả PRD chi tiết (user flow, data schema, AC). "
                f"LƯU Ý: Về khoảng cách siết răng chỉnh nha, hãy tạm thiết lập mặc định trong PRD là 5 ngày."
            )
        else:
            prompt_ba = (
                f"Đọc lại đặc tả PRD cũ của bạn và sửa đổi lỗi dựa trên phản hồi của Chuyên gia Nha khoa.\n"
                f"Phản hồi từ Chuyên gia Nha khoa:\n{medical_review}\n\n"
                f"Hãy sửa lại khoảng cách tái khám niềng răng về đúng chuẩn y khoa (21 ngày) và hoàn thiện bản PRD."
            )
            
        prd_output = call_gemini(si_ba, prompt_ba)
        print(f" -> BA đã tạo xong PRD Vòng {loop}.")
        
        print(f"[Vòng {loop}] Dental Specialist Agent đang thẩm định y khoa...")
        prompt_ds = (
            f"Đọc kỹ yêu cầu ban đầu: '{args.task}' và bản đặc tả PRD của BA:\n\n{prd_output}\n\n"
            f"Đóng vai trò Dental Specialist, hãy rà soát tính chính xác y khoa (đánh số răng FDI, khoảng cách siết răng, tiền sử bệnh nền). "
            f"BẮT BUỘC bắt đầu câu trả lời bằng cờ '[CẢNH BÁO Y KHOA]' ở dòng đầu tiên nếu phát hiện lỗi sai chuyên môn y khoa (như khoảng cách siết răng 5 ngày - quá ngắn, gây biến chứng tiêu xương), "
            f"hoặc '[ĐỒNG Ý LÂM SÀNG]' nếu phác đồ đã hoàn toàn an toàn và đúng chuẩn."
        )
        medical_review = call_gemini(si_ds, prompt_ds)
        first_line = medical_review.splitlines()[0] if medical_review.splitlines() else ""
        print(f" -> Kết quả thẩm định: {first_line}")
        
        if "[ĐỒNG Ý LÂM SÀNG]" in first_line or "[ĐỒNG Ý LÂM SÀNG]" in medical_review[:100]:
            print(">>> [PHÊ DUYỆT LÂM SÀNG] Chuyển sang bước tiếp theo.")
            break
        else:
            print(">>> [TỪ CHỐI LÂM SÀNG] Phát hiện sai sót y khoa. Kích hoạt phản hồi sửa đổi...")

    # -------------------------------------------------------------
    # VÒNG LẶP DEVELOPER <-> QA/TESTER (Phản biện Kỹ thuật)
    # -------------------------------------------------------------
    print("\n--- [BẮT ĐẦU VÒNG LẶP PHẢN BIỆN: DEVELOPER & QA TESTER] ---")
    dev_plan = ""
    qa_report = ""
    
    for loop in range(1, max_loops + 1):
        print(f"\n[Vòng {loop}] Developer Agent đang thiết kế phương án lập trình...")
        if loop == 1:
            # Cố tình đưa lỗi bảo mật ở vòng 1 để chứng minh vòng lặp hoạt động
            prompt_dev = (
                f"Đọc kỹ PRD đã duyệt:\n{prd_output}\n\nvà báo cáo y khoa:\n{medical_review}\n\n"
                f"Hãy đóng vai trò Developer, lên phương án kỹ thuật (DB, UI, offline sync, API). "
                f"LƯU Ý: Về bảo mật API Key của Gemini, hãy tạm thời đề xuất lưu trực tiếp ở file config.js của phía Client."
            )
        else:
            prompt_dev = (
                f"Đọc lại phương án thiết kế cũ của bạn và sửa đổi lỗi bảo mật/logic dựa trên phản hồi của QA.\n"
                f"Phản hồi từ QA:\n{qa_report}\n\n"
                f"Hãy sửa lại thiết kế, chuyển API Key sang Supabase Edge Functions để bảo mật hoàn toàn, và viết phương án hoàn chỉnh."
            )
            
        dev_plan = call_gemini(si_dev, prompt_dev)
        print(f" -> Developer đã soạn xong phương án Lập trình Vòng {loop}.")
        
        print(f"[Vòng {loop}] QA Agent đang kiểm thử chất lượng...")
        prompt_qa = (
            f"Đọc kỹ toàn bộ thông tin:\n- PRD: {prd_output}\n- Y khoa: {medical_review}\n- Phương án Lập trình: {dev_plan}\n\n"
            f"Đóng vai trò QA Tester, hãy kiểm tra bảo mật (API Key), đồng bộ offline, và giao diện. "
            f"BẮT BUỘC bắt đầu câu trả lời bằng cờ '[QA REJECTED]' ở dòng đầu tiên nếu phát hiện lỗi bảo mật (như lưu API key ở client) hoặc thiếu test case, "
            f"hoặc '[QA APPROVED]' nếu phương án đã hoàn hảo và an toàn."
        )
        qa_report = call_gemini(si_qa, prompt_qa)
        first_line = qa_report.splitlines()[0] if qa_report.splitlines() else ""
        print(f" -> Kết quả kiểm thử: {first_line}")
        
        if "[QA APPROVED]" in first_line or "[QA APPROVED]" in qa_report[:100]:
            print(">>> [QA SIGN-OFF] Ký duyệt chất lượng thành công!")
            break
        else:
            print(">>> [QA REJECTED] Phát hiện lỗi kỹ thuật/bảo mật. Kích hoạt yêu cầu sửa đổi...")

    # -------------------------------------------------------------
    # LƯU BÁO CÁO CỘNG TÁC TỔNG HỢP
    # -------------------------------------------------------------
    report_path = os.path.join(OUTPUTS_DIR, "reflective_collaboration_report.md")
    
    report_content = f"""# Báo cáo Cộng tác Phản biện Tự động (Reflective Loop Sign-off Report)

**Yêu cầu ban đầu của Bác sĩ:** {args.task}
**Model sử dụng:** `{args.model}`

---

## 1. PHÁC THẢO ĐẶC TẢ PRD CUỐI CÙNG (Sau Phản Biện Y Khoa)
{prd_output}

---

## 2. Ý KIẾN THẨM ĐỊNH LÂM SÀNG CUỐI CÙNG (Dental Specialist Review)
{medical_review}

---

## 3. PHƯƠNG ÁN KỸ THUẬT CUỐI CÙNG (Developer Plan)
{dev_plan}

---

## 4. KỊCH BẢN KIỂM THỬ & QA SIGN-OFF (QA Test Suite)
{qa_report}
"""

    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report_content)

    print("=" * 60)
    print(f" THÀNH CÔNG: Báo cáo cộng tác phản biện đã được ghi vào:")
    print(f" {report_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()

