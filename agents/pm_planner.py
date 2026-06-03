#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import urllib.error
import argparse

# Cấu hình đối số dòng lệnh
parser = argparse.ArgumentParser(description="PM Planner - AI Project Manager Lập Kế Hoạch Tiếp Theo")
parser.add_argument("--model", type=str, default="gemini-2.5-flash", help="Model Gemini sử dụng")
args = parser.parse_args()

# Thư mục gốc dự án
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)
PERSONAS_DIR = os.path.join(BASE_DIR, "personas")
OUTPUTS_DIR = os.path.join(BASE_DIR, "outputs")

# Lấy API Key
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    env_path = os.path.join(PROJECT_DIR, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GEMINI_API_KEY="):
                    API_KEY = line.strip().split("=", 1)[1].strip('"').strip("'")
                    break

# Hàm gọi Gemini API
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

# Hàm đọc thông tin dự án
def get_project_context():
    context = []
    
    # 1. Đọc walkthrough.md nếu có
    wt_path = os.path.join(PROJECT_DIR, "walkthrough.md")
    # Kiểm tra cả thư mục brain của artifact
    if not os.path.exists(wt_path):
        # Fallback thử tìm trong brain artifact
        brain_dir = os.path.dirname(os.path.dirname(BASE_DIR))
        # Quét thử các thư mục xung quanh nếu cần, nhưng ta ưu tiên đọc walkthrough.md ở thư mục hiện tại
        pass
        
    # Ta sẽ đọc trực tiếp từ thư mục workspace
    wt_path = "/Users/pro16/.gemini/antigravity-ide/brain/4ad54fb9-5a23-4982-8675-96905f7ddb70/walkthrough.md"
    if os.path.exists(wt_path):
        with open(wt_path, "r", encoding="utf-8") as f:
            context.append(f"### TRẠNG THÁI HIỆN TẠI (Walkthrough):\n{f.read()}\n")
            
    # 2. Đọc cấu trúc thư mục src/
    src_dir = os.path.join(PROJECT_DIR, "src")
    src_structure = []
    if os.path.exists(src_dir):
        for root, dirs, files in os.walk(src_dir):
            for file in files:
                rel_path = os.path.relpath(os.path.join(root, file), PROJECT_DIR)
                src_structure.append(f"- {rel_path}")
    context.append(f"### CẤU TRÚC MÃ NGUỒN HIỆN TẠI:\n" + "\n".join(src_structure) + "\n")
    
    return "\n".join(context)

def main():
    print("=" * 60)
    print(" KHỞI CHẠY PM PLANNER (PROJECT MANAGER)")
    print("=" * 60)
    
    # Đọc persona PM
    pm_persona_path = os.path.join(PERSONAS_DIR, "ProjectManager.md")
    if not os.path.exists(pm_persona_path):
        print(f"[LỖI] Không tìm thấy persona ProjectManager tại {pm_persona_path}")
        sys.exit(1)
        
    with open(pm_persona_path, "r", encoding="utf-8") as f:
        si_pm = f.read()

    # Thu thập ngữ cảnh dự án
    print("Đang quét cấu trúc thư mục và trạng thái mã nguồn...")
    project_context = get_project_context()
    
    # Tạo prompt lập kế hoạch
    prompt = f"""Dưới đây là ngữ cảnh trạng thái hiện tại của dự án Dental Clinic Manager:

{project_context}

Hãy đóng vai trò là Project Manager (PM), thực hiện các nhiệm vụ sau:
1. Đánh giá xem dự án đã hoàn thành những gì và đang ở Phase mấy của Roadmap tổng thể.
2. Xác định các thiếu sót hoặc rủi ro kỹ thuật ở thời điểm hiện tại.
3. Đề xuất Kế hoạch Hành động tiếp theo (Backlog) được phân chia rõ ràng dưới dạng các TICKET công việc cho BA, Developer, QA và Dental Specialist.
4. Tạo Bảng Quyết định/Phê duyệt của Bác sĩ (Doctor's Decision Table) để Bác sĩ có thể tích chọn:
   - Duyệt (Đồng ý làm bước tiếp theo)
   - Từ chối
   - Yêu cầu sửa đổi

Hãy định dạng kết quả dưới dạng Markdown đẹp mắt, chuẩn chỉ và lưu trữ rõ ràng để trình bày cho Bác sĩ.
"""

    print("Đang gọi PM Agent qua Gemini API để phân tích lập kế hoạch...")
    plan_output = call_gemini(si_pm, prompt)
    
    # Ghi tệp kế hoạch đầu ra
    output_path = os.path.join(OUTPUTS_DIR, "next_action_plan.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(plan_output)
        
    print("=" * 60)
    print(" TẠO KẾ HOẠCH THÀNH CÔNG!")
    print(f" Kế hoạch hành động tiếp theo đã được ghi nhận tại:")
    print(f" {output_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()
