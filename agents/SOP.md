# Quy trình Vận hành Chuẩn (SOP) - Đội ngũ AI Agent Nha khoa

Tài liệu này định nghĩa quy trình cộng tác giữa Bác sĩ (Product Owner) và 4 vai trò AI Agent để phát triển và kiểm thử các tính năng cho ứng dụng **Dental Clinic Manager**.

---

## 1. Định nghĩa vai trò (Roles Definition)

```mermaid
graph TD
    Doctor[Bác sĩ / Product Owner] <=> PM[Project Manager Agent]
    PM --> BA[Business Analyst Agent]
    BA --> DS[Dental Specialist Agent]
    DS --> Dev[Developer Agent]
    Dev --> QA[QA / Tester Agent]
    QA --> PM
```

| Vai trò | Agent Persona | Trách nhiệm chính | Sản phẩm đầu ra (Artifacts) |
| :--- | :--- | :--- | :--- |
| **Product Owner** | Bác sĩ nha khoa (Người dùng) | Đưa ra định hướng, phê duyệt kế hoạch đề xuất và nghiệm thu cuối cùng | Yêu cầu thô / Phê duyệt kế hoạch |
| **Project Manager** | PM & Scrum Master công nghệ | Quét tiến độ dự án, lên kế hoạch hành động tiếp theo, điều phối các Agent | Báo cáo Kế hoạch (Next Action Plan) |
| **Business Analyst** | BA chuyên ngành y tế | Làm mịn yêu cầu, vẽ luồng nghiệp vụ, đặc tả chi tiết | PRD (Tài liệu Đặc tả Yêu cầu) |
| **Dental Specialist** | Chuyên gia y khoa/nha sĩ | Thẩm định tính đúng đắn y học, kiểm tra sai số lâm sàng | Medical Review & Validation Report |
| **Developer** | Lập trình viên React/Native | Thiết kế DB Schema, API Flow, viết code sạch, bảo mật | Implementation Code & Design Diff |
| **QA / Tester** | Kiểm thử viên phần mềm | Viết kịch bản test, chạy thử nghiệm, kiểm tra giao diện & a11y | Test Suite & QA Sign-off Report |

---

## 2. Quy trình vận hành 6 Bước phát triển (6-Step Lifecycle)

### Bước 1: Lên Kế hoạch & Duyệt (Planning Phase - PM & Bác sĩ)
*   **Đầu vào:** Trạng thái mã nguồn hiện tại + Ý kiến từ Bác sĩ.
*   **Hành động:** PM Agent quét dự án, lập đề xuất danh sách công việc tiếp theo (Backlog). Bác sĩ xem xét, tích duyệt hoặc từ chối từng đầu việc.
*   **Đầu ra:** Danh sách công việc được duyệt (Approved Backlog).

### Bước 2: Phân tích Nghiệp vụ (BA Phase)
*   **Đầu vào:** Đầu việc được duyệt từ Bước 1.
*   **Hành động:** BA Agent phân tích, làm rõ nghiệp vụ, phác thảo đặc tả PRD.
*   **Đầu ra:** Đặc tả PRD thô chứa các luồng người dùng và cấu trúc dữ liệu đề xuất.

### Bước 3: Thẩm định Y khoa (Medical Validation Phase - Dental Specialist)
*   **Đầu vào:** Bản đặc tả PRD từ BA.
*   **Hành động:** Dental Specialist Agent đối chiếu với các nguyên tắc lâm sàng nha khoa:
    *   Tên răng có đúng hệ thống FDI (Răng 11-48, 51-85) không?
    *   Khoảng cách thời gian (intervals) giữa các bước điều trị có an toàn không? (Ví dụ: Chờ xương tích hợp implant ít nhất 3 tháng trước khi cấy mão).
    *   Các cảnh báo y tế có được làm nổi bật để tránh tai biến không?
*   **Đầu ra:** Báo cáo chấp thuận y khoa (Medical Review Approval/Rejection).

### Bước 4: Lên phương án Kiến trúc & Lập trình (Dev Phase)
*   **Đầu vào:** PRD đã qua thẩm định y học.
*   **Hành động:** Developer Agent thiết kế cấu trúc cơ sở dữ liệu (SQLite, Postgres), thiết kế UI/UX theo tiêu chuẩn HSL Teal/Slate, viết mã nguồn sạch (clean code).
*   **Đầu ra:** Phương án kỹ thuật & code thực tế.

### Bước 5: Kiểm thử chất lượng (QA Phase)
*   **Đầu vào:** Mã nguồn và PRD.
*   **Hành động:** QA Agent thực hiện:
    *   Viết Test Cases cho các kịch bản bình thường và cực đoan (Boundary/Edge Cases).
    *   Mô phỏng xung đột đồng bộ offline (Offline Sync Conflict).
    *   Kiểm tra giao diện (UI) và tính dễ tiếp cận (Accessibility - a11y) theo chuẩn WCAG.
*   **Đầu ra:** Báo cáo QA Sign-off. Nếu phát hiện lỗi, quay lại **Bước 4**.

### Bước 6: Bác sĩ Nghiệm thu (UAT Phase)
*   **Đầu vào:** Bản cài đặt / giao diện chạy thử kèm báo cáo QA.
*   **Hành động:** Bác sĩ duyệt trực quan trên thiết bị (hoặc trình giả lập).
*   **Đầu ra:** Chấp thuận phát hành hoặc đề xuất chỉnh sửa tiếp (quay lại Bước 1).

---

## 3. Quy tắc Cộng tác & Chất lượng (Quality Gates)

1.  **Strict Handoffs:** Mỗi bước đều phải có tài liệu hoặc định dạng dữ liệu (JSON/Markdown) rõ ràng để bước tiếp theo tiêu thụ. Không làm việc cảm tính.
2.  **Vòng lặp Phản biện Tự động (Reflective Loop Protocol):**
    *   **BA <-> Dental Specialist (Medical Guardrail):** Specialist đánh giá PRD. Nếu có sai sót lâm sàng, Specialist phản hồi kèm cờ `[CẢNH BÁO Y KHOA]` ở đầu. Hệ thống sẽ tự động chuyển phản hồi này cho BA để cập nhật lại PRD. Quá trình lặp lại đến khi Specialist ký duyệt `[ĐỒNG Ý LÂM SÀNG]`.
    *   **Dev <-> QA (Code Guardrail):** QA rà soát phương án lập trình. Nếu phát hiện lỗi hoặc thiếu sót kỹ thuật, QA phản hồi kèm cờ `[QA REJECTED]`. Developer nhận phản hồi, sửa lại mã nguồn đến khi QA ký duyệt `[QA APPROVED]`.
3.  **Medical Priority:** Mọi logic code liên quan đến nha khoa bắt buộc phải được Dental Specialist ký duyệt trước khi Dev viết code.
4.  **Offline-First & Security Safety:** Dev Agent luôn phải tuân thủ việc lưu trữ local trước, sync sau và tuyệt đối không nhúng Gemini API Key vào frontend client.
5.  **No Placeholders:** QA Agent không chấp nhận code có chứa ghi chú "TODO" hoặc mã giả lập ở những tính năng cốt lõi đã hoàn thiện.


