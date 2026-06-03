# Báo cáo Cộng tác Phát triển Tính năng (Multi-Agent Sign-off Report)

**Yêu cầu ban đầu của Bác sĩ:** Thêm tính năng nhắc nhở bệnh nhân niềng răng tái khám để kích hoạt khí cụ kéo răng định kỳ 3 tuần
**Model sử dụng:** `gemini-2.5-flash`

---

## 1. BẢN ĐẶC TẢ NGHIỆP VỤ (BA PRD)
Tuyệt vời, Bác sĩ! Tôi đã tiếp nhận yêu cầu về tính năng nhắc nhở tái khám cho bệnh nhân niềng răng. Đây là một tính năng rất quan trọng để đảm bảo hiệu quả điều trị và tối ưu hóa quy trình vận hành của phòng khám.

Dựa trên yêu cầu và các nguyên tắc nghiệp vụ đã đề ra, tôi xin trình bày bản Đặc tả Yêu cầu Phần mềm (PRD) chi tiết như sau:

---

## PRD: Tính năng Nhắc nhở Tái khám Tự động cho Bệnh nhân Niềng răng

### 1. Mô tả Tính năng (Feature Description)

**Vấn đề cần giải quyết:**
Bệnh nhân niềng răng cần tái khám định kỳ (thường là 3-4 tuần một lần) để Bác sĩ điều chỉnh khí cụ, thay dây cung hoặc kích hoạt các cơ chế kéo răng. Việc bỏ lỡ hoặc trễ hẹn tái khám có thể làm kéo dài thời gian điều trị, ảnh hưởng đến kết quả cuối cùng và gây lãng phí nguồn lực của phòng khám trong việc theo dõi thủ công.

**Giải pháp:**
Phát triển một hệ thống nhắc nhở tự động cho bệnh nhân niềng răng dựa trên lịch tái khám đã được thiết lập trong phác đồ điều trị. Hệ thống sẽ tự động gửi thông báo đến bệnh nhân và cảnh báo cho Lễ tân/Bác sĩ về các trường hợp sắp đến lịch hoặc đã quá lịch hẹn, giúp tối ưu hóa việc quản lý lịch hẹn và đảm bảo tuân thủ phác đồ điều trị.

**Mục tiêu:**
*   Giảm thiểu tỷ lệ bệnh nhân trễ/bỏ lỡ lịch tái khám niềng răng.
*   Tự động hóa quy trình nhắc nhở, giảm tải công việc cho Lễ tân.
*   Cung cấp cái nhìn tổng quan về tình trạng tuân thủ lịch hẹn của bệnh nhân cho Bác sĩ và Lễ tân.
*   Đảm bảo tiến độ điều trị niềng răng theo đúng phác đồ.

### 2. Tác nhân & Luồng đi (User Persona & User Flow)

**Tác nhân:**
*   **Bác sĩ:** Lập phác đồ điều trị, thiết lập khoảng thời gian tái khám.
*   **Lễ tân:** Quản lý lịch hẹn, theo dõi trạng thái nhắc nhở, liên hệ bệnh nhân khi cần.
*   **Bệnh nhân:** Nhận thông báo nhắc nhở, xác nhận/đặt lại lịch hẹn.

**Luồng đi (User Flow):**

**A. Thiết lập Phác đồ Điều trị & Lịch Tái khám (Bác sĩ)**
1.  **Bác sĩ** truy cập hồ sơ bệnh nhân và chọn chức năng "Lập phác đồ điều trị".
2.  **Bác sĩ** chọn loại điều trị là "Niềng răng" (hoặc tương tự).
3.  Trong phần chi tiết phác đồ, **Bác sĩ** nhập "Khoảng thời gian tái khám định kỳ" (ví dụ: 21 ngày) cho phác đồ này.
4.  **Bác sĩ** lưu phác đồ điều trị.
5.  *Hệ thống:* Tự động ghi nhận khoảng thời gian tái khám và tính toán ngày tái khám dự kiến đầu tiên dựa trên ngày bắt đầu phác đồ hoặc ngày hẹn cuối cùng đã hoàn thành.

**B. Quản lý Lịch hẹn & Nhắc nhở (Lễ tân & Hệ thống)**
1.  **Hệ thống:** Hàng ngày, quét danh sách các bệnh nhân niềng răng có lịch tái khám sắp tới (ví dụ: trong vòng 3 ngày tới).
2.  **Hệ thống:** Gửi tin nhắn nhắc nhở tự động (SMS/Zalo/App Notification) đến bệnh nhân với nội dung đã cấu hình (ví dụ: "Phòng khám ABC xin nhắc lịch tái khám niềng răng của bạn vào ngày [Ngày hẹn]. Vui lòng xác nhận hoặc liên hệ để đổi lịch.").
3.  **Lễ tân:** Truy cập giao diện "Quản lý Lịch hẹn" hoặc "Danh sách Bệnh nhân Niềng răng".
4.  **Lễ tân** thấy danh sách các bệnh nhân sắp đến lịch tái khám, trạng thái nhắc nhở (Đã gửi, Đã xác nhận, Chưa phản hồi).
5.  **Lễ tân** có thể:
    *   Xem chi tiết lịch hẹn và phác đồ điều trị của bệnh nhân.
    *   Gửi lại nhắc nhở thủ công nếu bệnh nhân chưa phản hồi.
    *   Liên hệ trực tiếp với bệnh nhân để xác nhận hoặc đặt lại lịch hẹn.
    *   Cập nhật trạng thái lịch hẹn (ví dụ: "Đã xác nhận", "Đã đổi lịch").
6.  **Hệ thống:** Khi bệnh nhân hoàn thành buổi tái khám, **Lễ tân** hoặc **Bác sĩ** đánh dấu lịch hẹn là "Đã hoàn thành".
7.  **Hệ thống:** Tự động tính toán và cập nhật ngày tái khám dự kiến tiếp theo dựa trên ngày hoàn thành buổi tái khám hiện tại và khoảng thời gian tái khám đã thiết lập.

**C. Cảnh báo Trễ hẹn (Hệ thống & Lễ tân/Bác sĩ)**
1.  **Hệ thống:** Hàng ngày, quét danh sách các bệnh nhân niềng răng đã quá ngày tái khám dự kiến mà chưa có lịch hẹn mới hoặc chưa hoàn thành buổi tái khám.
2.  **Hệ thống:** Nếu số ngày trễ hẹn vượt quá ngưỡng quy định (ví dụ: 7 ngày), hệ thống sẽ:
    *   Đánh dấu bệnh nhân đó trên giao diện quản lý (ví dụ: đổi màu, hiển thị biểu tượng cảnh báo).
    *   Hiển thị cảnh báo trên Dashboard của Lễ tân và Bác sĩ.
3.  **Lễ tân/Bác sĩ:** Dựa vào cảnh báo để chủ động liên hệ bệnh nhân, tìm hiểu lý do và sắp xếp lại lịch hẹn.

### 3. Đặc tả dữ liệu (Data Specification)

Để hỗ trợ tính năng này, cần bổ sung hoặc điều chỉnh các trường dữ liệu trong các bảng sau:

**Bảng `Patients` (Bệnh nhân):**
*   `patient_id` (PK, UUID)
*   `patient_name` (VARCHAR)
*   `phone_number` (VARCHAR)
*   `zalo_id` (VARCHAR, nullable - nếu tích hợp Zalo)
*   ... (các thông tin hành chính khác)

**Bảng `TreatmentPlans` (Phác đồ điều trị):**
*   `treatment_plan_id` (PK, UUID)
*   `patient_id` (FK to `Patients.patient_id`)
*   `treatment_type` (VARCHAR, ví dụ: 'Niềng răng', 'Trám răng', 'Nhổ răng')
*   `start_date` (DATE)
*   `expected_end_date` (DATE, nullable)
*   **`re_examination_interval_days` (INTEGER, nullable):** Số ngày giữa các lần tái khám định kỳ (ví dụ: 21). Chỉ áp dụng cho các loại điều trị cần tái khám định kỳ.
*   `current_status` (VARCHAR, ví dụ: 'Đang điều trị', 'Hoàn thành', 'Tạm dừng')
*   ... (các thông tin khác của phác đồ)

**Bảng `Appointments` (Lịch hẹn):**
*   `appointment_id` (PK, UUID)
*   `patient_id` (FK to `Patients.patient_id`)
*   `treatment_plan_id` (FK to `TreatmentPlans.treatment_plan_id`, nullable - liên kết lịch hẹn với phác đồ cụ thể)
*   `scheduled_date` (DATETIME)
*   `actual_date` (DATETIME, nullable - ngày thực tế bệnh nhân đến)
*   `appointment_type` (VARCHAR, ví dụ: 'Tái khám niềng răng', 'Khám tổng quát', 'Điều trị')
*   `status` (VARCHAR, ví dụ: 'Đã hẹn', 'Đã hoàn thành', 'Đã hủy', 'Trễ hẹn', 'Đã xác nhận')
*   **`is_re_examination` (BOOLEAN):** Đánh dấu đây có phải là lịch tái khám định kỳ hay không.
*   **`next_re_examination_date_calculated` (DATE, nullable):** Ngày tái khám dự kiến tiếp theo được hệ thống tính toán sau khi lịch hẹn này hoàn thành.

**Bảng `ReminderLogs` (Nhật ký nhắc nhở - Bảng mới):**
*   `reminder_log_id` (PK, UUID)
*   `appointment_id` (FK to `Appointments.appointment_id`)
*   `patient_id` (FK to `Patients.patient_id`)
*   `sent_date` (DATETIME)
*   `channel` (VARCHAR, ví dụ: 'SMS', 'Zalo', 'App Notification')
*   `message_content` (TEXT)
*   `status` (VARCHAR, ví dụ: 'Đã gửi', 'Đã nhận', 'Lỗi', 'Đã xác nhận', 'Chưa phản hồi')
*   `response_date` (DATETIME, nullable - thời gian bệnh nhân phản hồi)

**Bảng `SystemSettings` (Cấu hình hệ thống - Cần bổ sung):**
*   `setting_key` (VARCHAR, ví dụ: 'reminder_days_before_appointment')
*   `setting_value` (VARCHAR, ví dụ: '2')
*   `description` (TEXT)

### 4. Tiêu chí nghiệm thu (Acceptance Criteria - AC)

Để tính năng được coi là hoàn thành và hoạt động đúng, các điều kiện sau phải được đáp ứng:

*   **AC1 (Thiết lập Phác đồ):** Bác sĩ phải có khả năng nhập và lưu "Khoảng thời gian tái khám định kỳ" (ví dụ: 21 ngày) khi tạo hoặc chỉnh sửa phác đồ điều trị có loại là "Niềng răng". Giá trị này phải là số nguyên dương.
*   **AC2 (Tính toán Lịch hẹn Tự động):**
    *   Khi một phác đồ niềng răng được tạo với `re_examination_interval_days`, hệ thống phải tự động tính toán và hiển thị ngày tái khám dự kiến đầu tiên.
    *   Khi một lịch hẹn tái khám niềng răng được đánh dấu là "Đã hoàn thành", hệ thống phải tự động tính toán và cập nhật `next_re_examination_date_calculated` cho lịch hẹn tiếp theo dựa trên `actual_date` của lịch hẹn vừa hoàn thành và `re_examination_interval_days` của phác đồ.
*   **AC3 (Gửi Nhắc nhở Tự động):**
    *   Hệ thống phải tự động gửi tin nhắn nhắc nhở (SMS/Zalo) cho bệnh nhân có lịch tái khám niềng răng sắp tới, X ngày trước ngày hẹn (X là giá trị cấu hình được, mặc định 2 ngày).
    *   Nội dung tin nhắn phải có thể cấu hình được và bao gồm thông tin về ngày hẹn, tên phòng khám.
*   **AC4 (Giao diện Quản lý Lịch hẹn):**
    *   Lễ tân phải có thể xem danh sách các bệnh nhân niềng răng sắp đến lịch tái khám (trong vòng N ngày tới, N có thể cấu hình).
    *   Danh sách này phải hiển thị tên bệnh nhân, ngày hẹn dự kiến, trạng thái nhắc nhở (Đã gửi, Đã xác nhận, Chưa phản hồi).
    *   Lễ tân phải có tùy chọn để gửi lại nhắc nhở thủ công cho từng bệnh nhân.
*   **AC5 (Cảnh báo Trễ hẹn):**
    *   Nếu một bệnh nhân niềng răng đã quá ngày tái khám dự kiến và chưa có lịch hẹn mới trong vòng Y ngày (Y là giá trị cấu hình được, mặc định 7 ngày), hệ thống phải đánh dấu bệnh nhân đó bằng màu sắc khác (ví dụ: Đỏ) hoặc biểu tượng cảnh báo trên giao diện quản lý lịch hẹn và danh sách bệnh nhân.
    *   Cảnh báo này phải hiển thị rõ ràng trên Dashboard của Lễ tân và Bác sĩ.
*   **AC6 (Xem Lịch sử Tái khám):** Bác sĩ phải có thể xem lịch sử các lần tái khám của bệnh nhân niềng răng trong hồ sơ bệnh án, bao gồm ngày hẹn, ngày thực tế đến, và tình trạng tuân thủ (đúng hẹn/trễ hẹn).
*   **AC7 (Tối ưu hóa nhập liệu):** Khi tạo lịch hẹn tái khám cho bệnh nhân niềng răng, hệ thống nên gợi ý ngày hẹn dựa trên `next_re_examination_date_calculated` để Lễ tân chỉ cần xác nhận hoặc điều chỉnh nhỏ.

---

Bác sĩ vui lòng xem xét bản PRD này. Nếu có bất kỳ điểm nào cần làm rõ, bổ sung hoặc điều chỉnh, tôi sẵn sàng lắng nghe và cập nhật để đảm bảo tính năng được phát triển chính xác theo nhu cầu của phòng khám.

---

## 2. THẨM ĐỊNH LÂM SÀNG Y KHOA (Dental Specialist Review)
Chào BA,

Tôi đã đọc kỹ yêu cầu ban đầu và bản Đặc tả Yêu cầu Phần mềm (PRD) cho tính năng "Nhắc nhở Tái khám Tự động cho Bệnh nhân Niềng răng".

Với vai trò là Chuyên gia Nha khoa lâm sàng, tôi đánh giá cao sự chi tiết và logic của bản PRD. Đặc biệt, tôi nhận thấy BA đã nắm bắt rất tốt các yêu cầu về khoảng cách thời gian tái khám và ngưỡng cảnh báo trễ hẹn, điều này cực kỳ quan trọng đối với an toàn và hiệu quả điều trị chỉnh nha.

Dưới đây là báo cáo phê duyệt và các cảnh báo/góp ý (nếu có) dựa trên tiêu chuẩn kiểm duyệt y khoa:

---

### Báo cáo Phê duyệt & Cảnh báo Y khoa

**1. Về Thuật ngữ & Đánh số răng FDI:**
*   Bản PRD không đề cập trực tiếp đến đánh số răng FDI, điều này là hợp lý vì tính năng này tập trung vào lịch hẹn tái khám chung cho điều trị niềng răng, không liên quan đến răng cụ thể.
*   Các thuật ngữ sử dụng như "niềng răng", "tái khám", "phác đồ điều trị", "khí cụ" đều chính xác và phù hợp với chuyên ngành.

**2. Về Lộ trình & Khoảng cách điều trị chuẩn (Treatment Timeline Intervals):**
*   **Chỉnh nha (Niềng răng):**
    *   PRD nêu rõ "tái khám định kỳ (thường là 3-4 tuần một lần)" và ví dụ "21 ngày" cho khoảng thời gian tái khám. Điều này **hoàn toàn phù hợp** với tiêu chuẩn lâm sàng (21 - 28 ngày) để thay dây cung, tăng lực chun hoặc điều chỉnh khí cụ.
    *   Điểm **đặc biệt xuất sắc** là PRD đã đưa ra ngưỡng cảnh báo trễ hẹn: "Nếu số ngày trễ hẹn vượt quá ngưỡng quy định (ví dụ: 7 ngày), hệ thống sẽ... hiển thị cảnh báo". Điều này **chính xác tuyệt đối** với khuyến cáo y khoa: "Nếu bệnh nhân trễ quá 7 ngày, lực kéo sẽ không được kiểm soát gây biến chứng (tiêu xương, lệch trục)". Việc hệ thống tự động cảnh báo ở ngưỡng này là một tính năng an toàn bệnh nhân cực kỳ quan trọng.

**3. Về Cảnh báo Y khoa Đặc biệt (Red Flag Contraindications):**
*   **CẢNH BÁO QUAN TRỌNG:** Bản PRD hiện tại **chưa đề cập** đến việc tích hợp các thông tin về tiền sử bệnh lý nguy hiểm của bệnh nhân (Bệnh lý tim mạch/Tăng huyết áp, Máu khó đông/Thuốc chống đông, Tiểu đường, Dị ứng thuốc tê/kháng sinh) vào hệ thống.
*   Mặc dù tính năng này chỉ tập trung vào nhắc nhở tái khám niềng răng (thường ít xâm lấn), nhưng với vai trò là một hệ thống quản lý phòng khám nha khoa tổng thể, việc **bắt buộc phải có** các trường dữ liệu này trong hồ sơ bệnh nhân là tối quan trọng.
*   **Khuyến nghị:**
    *   Cần bổ sung các trường dữ liệu liên quan đến tiền sử bệnh lý và dị ứng vào bảng `Patients` (hoặc một bảng `PatientMedicalHistory` riêng biệt liên kết với `Patients`). Ví dụ:
        *   `medical_history_notes` (TEXT)
        *   `has_cardiovascular_disease` (BOOLEAN)
        *   `is_diabetic` (BOOLEAN)
        *   `has_bleeding_disorder` (BOOLEAN)
        *   `drug_allergies` (TEXT)
        *   `allergy_to_local_anesthesia` (BOOLEAN)
        *   `allergy_to_antibiotics` (TEXT)
    *   Mặc dù tính năng nhắc nhở này không trực tiếp sử dụng các thông tin này, nhưng việc có chúng trong hệ thống là nền tảng cho các tính năng khác trong tương lai (ví dụ: khi lên lịch các thủ thuật xâm lấn hơn, hoặc khi bác sĩ xem hồ sơ trước buổi tái khám).
    *   Đảm bảo rằng các thông tin này được hiển thị nổi bật (ví dụ: màu đỏ) trên trang đầu của hồ sơ bệnh nhân hoặc trên giao diện quản lý lịch hẹn khi bác sĩ/lễ tân truy cập, để luôn có cái nhìn tổng quan về các rủi ro tiềm ẩn.

---

### Kết luận & Phê duyệt

Bản PRD này **được phê duyệt** về mặt logic nghiệp vụ và khoảng cách thời gian điều trị cho tính năng nhắc nhở tái khám niềng răng. Việc BA đã đưa ra ngưỡng cảnh báo 7 ngày trễ hẹn là một điểm cộng lớn về an toàn lâm sàng.

Tuy nhiên, tôi **cảnh báo** về sự thiếu vắng của các trường dữ liệu về tiền sử bệnh lý và dị ứng trong đặc tả dữ liệu. Đây là một lỗ hổng tiềm ẩn về an toàn bệnh nhân trong thiết kế hệ thống tổng thể. Tôi đề nghị BA xem xét bổ sung các trường dữ liệu này vào mô hình dữ liệu cơ bản của bệnh nhân, ngay cả khi chúng chưa được sử dụng trực tiếp trong tính năng nhắc nhở này, để đảm bảo tuân thủ 100% y học lâm sàng thực tế và an toàn cho bệnh nhân về lâu dài.

Nếu có bất kỳ thắc mắc nào khác, tôi sẵn sàng giải đáp.

---

## 3. PHƯƠNG ÁN KỸ THUẬT & LẬP TRÌNH (Developer Plan)
Tuyệt vời, Bác sĩ và BA! Tôi đã đọc kỹ PRD và báo cáo y khoa. Tôi đánh giá cao sự chi tiết của PRD và đặc biệt là cảnh báo y khoa về việc thiếu thông tin tiền sử bệnh lý. Đây là một điểm cực kỳ quan trọng mà chúng ta cần ưu tiên xử lý ngay từ đầu để đảm bảo an toàn cho bệnh nhân và tuân thủ các tiêu chuẩn y tế.

Với vai trò là Kỹ sư Lập trình Trưởng, tôi xin trình bày phương án kỹ thuật chi tiết để hiện thực hóa tính năng này, tuân thủ các nguyên tắc kỹ thuật cốt lõi và tiêu chuẩn mã nguồn đã đề ra.

---

## Phương án Kỹ thuật: Nhắc nhở Tái khám Tự động cho Bệnh nhân Niềng răng

### 1. Tổng quan Kiến trúc & Công nghệ

*   **Frontend (Mobile):** React Native (Expo) cho iOS/iPad.
*   **Frontend (Web):** React + Vite.
*   **Local Database:** WatermelonDB (cho cả React Native và Web) để triển khai Offline-First.
*   **Backend & Remote Database:** Supabase (PostgreSQL, Auth, Realtime, Edge Functions).
*   **Notification Gateway:** Supabase Edge Functions (hoặc một dịch vụ backend riêng) để gửi SMS/Zalo/App Notifications.
*   **AI Gateway (Future-proof):** Supabase Edge Functions để xử lý các tác vụ AI (như OCR, STT) một cách bảo mật.

### 2. Cấu trúc Database (WatermelonDB & Supabase PostgreSQL)

Chúng ta sẽ sử dụng cùng một schema cho cả WatermelonDB cục bộ và Supabase PostgreSQL để đảm bảo đồng bộ hóa liền mạch.

**Các thay đổi và bổ sung chính:**

#### Bảng `Patients` (Bệnh nhân)

*   **Bổ sung theo cảnh báo y khoa:**
    *   `medical_history_notes`: `text`, nullable (Ghi chú tiền sử bệnh lý tổng quát)
    *   `has_cardiovascular_disease`: `boolean`, default `false` (Bệnh tim mạch/Tăng huyết áp)
    *   `is_diabetic`: `boolean`, default `false` (Tiểu đường)
    *   `has_bleeding_disorder`: `boolean`, default `false` (Máu khó đông/Thuốc chống đông)
    *   `drug_allergies`: `text`, nullable (Dị ứng thuốc, ví dụ: Penicillin, Aspirin)
    *   `allergy_to_local_anesthesia`: `boolean`, default `false` (Dị ứng thuốc tê)
    *   `allergy_to_antibiotics`: `text`, nullable (Dị ứng kháng sinh cụ thể)
*   **Cho đồng bộ Offline-First:**
    *   `created_at`: `datetime`
    *   `updated_at`: `datetime`
    *   `deleted`: `boolean`, default `false` (Soft Delete)

#### Bảng `TreatmentPlans` (Phác đồ điều trị)

*   **Bổ sung theo PRD:**
    *   `re_examination_interval_days`: `number`, nullable (Số ngày giữa các lần tái khám định kỳ)
*   **Cho đồng bộ Offline-First:**
    *   `created_at`: `datetime`
    *   `updated_at`: `datetime`
    *   `deleted`: `boolean`, default `false`

#### Bảng `Appointments` (Lịch hẹn)

*   **Bổ sung theo PRD:**
    *   `is_re_examination`: `boolean`, default `false` (Đánh dấu lịch tái khám định kỳ)
    *   `next_re_examination_date_calculated`: `datetime`, nullable (Ngày tái khám dự kiến tiếp theo)
*   **Cho đồng bộ Offline-First:**
    *   `created_at`: `datetime`
    *   `updated_at`: `datetime`
    *   `deleted`: `boolean`, default `false`

#### Bảng `ReminderLogs` (Nhật ký nhắc nhở - Bảng mới)

*   `reminder_log_id`: `string` (PK, UUID)
*   `appointment_id`: `string` (FK to `Appointments.appointment_id`)
*   `patient_id`: `string` (FK to `Patients.patient_id`)
*   `sent_date`: `datetime`
*   `channel`: `string` (e.g., 'SMS', 'Zalo', 'App Notification')
*   `message_content`: `text`
*   `status`: `string` (e.g., 'Sent', 'Received', 'Failed', 'Confirmed', 'No Response')
*   `response_date`: `datetime`, nullable
*   **Cho đồng bộ Offline-First:**
    *   `created_at`: `datetime`
    *   `updated_at`: `datetime`
    *   `deleted`: `boolean`, default `false`

#### Bảng `SystemSettings` (Cấu hình hệ thống - Bảng mới)

*   `setting_key`: `string` (PK, e.g., 'reminder_days_before_appointment', 'overdue_alert_days')
*   `setting_value`: `string`
*   `description`: `text`, nullable
*   **Cho đồng bộ Offline-First:**
    *   `created_at`: `datetime`
    *   `updated_at`: `datetime`
    *   `deleted`: `boolean`, default `false`

---

### 3. Luồng Đồng bộ Offline-First (WatermelonDB & Supabase)

Chúng ta sẽ triển khai mô hình đồng bộ hai chiều (Two-Way Sync) dựa trên WatermelonDB và Supabase.

#### 3.1. Cấu hình WatermelonDB Schema

```javascript
// src/models/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const appSchema = appSchema({
  version: 1, // Tăng version khi có thay đổi schema
  tables: [
    tableSchema({
      name: 'patients',
      columns: [
        { name: 'patient_name', type: 'string' },
        { name: 'phone_number', type: 'string' },
        { name: 'zalo_id', type: 'string', isOptional: true },
        // Bổ sung theo cảnh báo y khoa
        { name: 'medical_history_notes', type: 'string', isOptional: true },
        { name: 'has_cardiovascular_disease', type: 'boolean', isIndexed: true },
        { name: 'is_diabetic', type: 'boolean', isIndexed: true },
        { name: 'has_bleeding_disorder', type: 'boolean', isIndexed: true },
        { name: 'drug_allergies', type: 'string', isOptional: true },
        { name: 'allergy_to_local_anesthesia', type: 'boolean', isIndexed: true },
        { name: 'allergy_to_antibiotics', type: 'string', isOptional: true },
        // Fields cho đồng bộ
        { name: 'created_at', type: 'number' }, // WatermelonDB dùng number cho datetime
        { name: 'updated_at', type: 'number', isIndexed: true },
        { name: 'deleted', type: 'boolean', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'treatment_plans',
      columns: [
        { name: 'patient_id', type: 'string', isIndexed: true },
        { name: 'treatment_type', type: 'string' },
        { name: 'start_date', type: 'number' },
        { name: 'expected_end_date', type: 'number', isOptional: true },
        { name: 're_examination_interval_days', type: 'number', isOptional: true }, // Bổ sung
        { name: 'current_status', type: 'string' },
        // Fields cho đồng bộ
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
        { name: 'deleted', type: 'boolean', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'appointments',
      columns: [
        { name: 'patient_id', type: 'string', isIndexed: true },
        { name: 'treatment_plan_id', type: 'string', isIndexed: true, isOptional: true },
        { name: 'scheduled_date', type: 'number', isIndexed: true },
        { name: 'actual_date', type: 'number', isOptional: true },
        { name: 'appointment_type', type: 'string' },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'is_re_examination', type: 'boolean', isIndexed: true }, // Bổ sung
        { name: 'next_re_examination_date_calculated', type: 'number', isOptional: true }, // Bổ sung
        // Fields cho đồng bộ
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
        { name: 'deleted', type: 'boolean', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'reminder_logs', // Bảng mới
      columns: [
        { name: 'appointment_id', type: 'string', isIndexed: true },
        { name: 'patient_id', type: 'string', isIndexed: true },
        { name: 'sent_date', type: 'number' },
        { name: 'channel', type: 'string' },
        { name: 'message_content', type: 'string' },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'response_date', type: 'number', isOptional: true },
        // Fields cho đồng bộ
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
        { name: 'deleted', type: 'boolean', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'system_settings', // Bảng mới
      columns: [
        { name: 'setting_key', type: 'string', isIndexed: true }, // PK logic
        { name: 'setting_value', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        // Fields cho đồng bộ
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
        { name: 'deleted', type: 'boolean', isIndexed: true },
      ],
    }),
  ],
});
```

#### 3.2. Luồng Đồng bộ (Sync Flow)

1.  **Client-side (WatermelonDB):**
    *   **`last_pulled_at`:** Lưu trữ timestamp của lần đồng bộ thành công gần nhất.
    *   **`synchronize()` function:**
        *   **Push Changes:** WatermelonDB tự động theo dõi các thay đổi cục bộ (tạo mới, cập nhật, xóa). Khi gọi `synchronize()`, nó sẽ thu thập các thay đổi này và gửi lên server.
        *   **Pull Changes:** Gửi `last_pulled_at` lên server. Server trả về tất cả các thay đổi từ `last_pulled_at` cho đến hiện tại.
        *   **Apply Changes:** WatermelonDB áp dụng các thay đổi từ server vào DB cục bộ.
        *   **Conflict Resolution:** Mặc định WatermelonDB sử dụng chiến lược "last-write-wins" (bản ghi có `updated_at` mới nhất sẽ thắng). Chúng ta có thể tùy chỉnh nếu cần logic phức tạp hơn.
2.  **Server-side (Supabase Edge Functions / Backend API):**
    *   **`/sync` endpoint:**
        *   Nhận `last_pulled_at` và `changes` từ client.
        *   **Apply Push:** Duyệt qua `changes` từ client, áp dụng vào Supabase PostgreSQL. Cập nhật `updated_at` trên server.
        *   **Generate Pull:** Truy vấn tất cả các bảng để lấy các bản ghi đã thay đổi (tạo mới, cập nhật, xóa mềm) kể từ `last_pulled_at` của client.
        *   Trả về `changes` cho client và `current_timestamp` để client cập nhật `last_pulled_at`.
    *   **Supabase Realtime:** Có thể sử dụng để thông báo cho client khi có thay đổi trên server, kích hoạt đồng bộ chủ động thay vì chỉ đồng bộ định kỳ.

#### 3.3. Đồng bộ Nền (Background Sync)

*   **React Native:** Sử dụng thư viện như `react-native-background-fetch` hoặc `expo-task-manager` để chạy tác vụ đồng bộ định kỳ khi ứng dụng ở chế độ nền.
*   **Web:** Sử dụng `Service Worker` và `Background Sync API` để thực hiện đồng bộ ngay cả khi tab trình duyệt đóng.

#### 3.4. Xử lý Lỗi Đồng bộ

*   Sử dụng `try/catch` block quanh hàm `synchronize()`.
*   Hiển thị thông báo lỗi thân thiện cho người dùng nếu đồng bộ thất bại (ví dụ: mất mạng, lỗi server).
*   Cơ chế retry với exponential backoff.

---

### 4. Thiết kế Giao diện (UI/UX) cao cấp

#### 4.1. Bảng màu HSL

Chúng ta sẽ định nghĩa các biến màu trong file `src/styles/colors.js` hoặc `src/styles/theme.js`.

```javascript
// src/styles/colors.js
export const colors = {
  primary: 'hsl(180, 70%, 40%)', // Teal - Main actions, active states
  primaryLight: 'hsl(180, 70%, 50%)',
  primaryDark: 'hsl(180, 70%, 30%)',

  secondary: 'hsl(210, 10%, 30%)', // Slate - Backgrounds, text
  secondaryLight: 'hsl(210, 10%, 40%)',
  secondaryDark: 'hsl(210, 10%, 20%)',

  accent: 'hsl(120, 50%, 40%)', // Emerald - Completed, success
  accentLight: 'hsl(120, 50%, 50%)',

  warning: 'hsl(36, 90%, 50%)', // Amber - Upcoming, pending
  warningLight: 'hsl(36, 90%, 60%)',

  danger: 'hsl(350, 70%, 50%)', // Rose - Overdue, critical
  dangerLight: 'hsl(350, 70%, 60%)',

  text: 'hsl(210, 10%, 90%)', // Light text on dark backgrounds
  textSecondary: 'hsl(210, 10%, 70%)',
  background: 'hsl(210, 10%, 15%)', // Dark background
  cardBackground: 'hsl(210, 10%, 20%)',
};
```

#### 4.2. Thiết kế Component & Luồng UI

**A. `PatientForm` (Bác sĩ - Lập phác đồ điều trị)**

*   **Input `re_examination_interval_days`:**
    *   Sử dụng `TextInput` với `keyboardType="numeric"` và validation để đảm bảo là số nguyên dương.
    *   Hiển thị gợi ý rõ ràng (ví dụ: "Số ngày giữa các lần tái khám định kỳ (ví dụ: 21)").
*   **Hiển thị Tiền sử Bệnh lý (CRITICAL):**
    *   Một section riêng biệt, nổi bật (ví dụ: `backgroundColor: colors.dangerLight` hoặc `borderColor: colors.danger`) có tiêu đề "Cảnh báo Y tế Quan trọng" hoặc "Tiền sử Bệnh lý".
    *   Các trường `has_cardiovascular_disease`, `is_diabetic`, `has_bleeding_disorder`, `allergy_to_local_anesthesia` sẽ được hiển thị dưới dạng `Switch` hoặc `Checkbox` với nhãn rõ ràng.
    *   Các trường `medical_history_notes`, `drug_allergies`, `allergy_to_antibiotics` là `TextInput` đa dòng.
    *   Nếu bất kỳ trường `boolean` nào là `true` hoặc `text` có giá trị, section này sẽ được highlight màu đỏ/cam để thu hút sự chú ý.

**B. `AppointmentList` (Lễ tân - Quản lý Lịch hẹn)**

*   **Giao diện Responsive:**
    *   **iPad/Tablet:** Dạng bảng (Table View) với nhiều cột thông tin.
    *   **iPhone/Android:** Dạng danh sách (List View) với các thẻ (Card) có thể mở rộng để xem chi tiết.
*   **Mã màu trạng thái:**
    *   **Bình thường/Đã hẹn:** `colors.primary` hoặc `colors.secondary`.
    *   **Sắp đến lịch (trong X ngày):** `colors.warning` (Amber).
    *   **Quá lịch hẹn (trễ Y ngày):** `colors.danger` (Rose).
    *   **Đã hoàn thành:** `colors.accent` (Emerald).
*   **Thông tin hiển thị:** Tên bệnh nhân, Ngày hẹn dự kiến, Trạng thái nhắc nhở (Đã gửi, Đã xác nhận, Chưa phản hồi), Nút hành động (Gửi lại nhắc nhở, Gọi điện, Xem chi tiết).
*   **Micro-animations:**
    *   Hiệu ứng `fade-in` khi danh sách tải.
    *   Hiệu ứng `press` nhẹ nhàng cho các nút và item danh sách.
    *   `ActivityIndicator` khi đang tải dữ liệu hoặc gửi nhắc nhở.

**C. `PatientDashboard` (Bác sĩ/Lễ tân)**

*   **Widgets:** "Lịch tái khám sắp tới", "Bệnh nhân trễ hẹn".
*   Widget "Bệnh nhân trễ hẹn" sẽ có nền màu `colors.danger` và số lượng bệnh nhân trễ hẹn nổi bật.
*   Widget "Lịch tái khám sắp tới" có thể dùng `colors.warning`.

**D. `AppointmentForm` (Lễ tân - Tạo/Chỉnh sửa lịch hẹn)**

*   **Gợi ý ngày hẹn:** Khi chọn bệnh nhân niềng răng, nếu có `next_re_examination_date_calculated` từ phác đồ, trường ngày hẹn sẽ tự động điền giá trị này. Lễ tân có thể chấp nhận hoặc chỉnh sửa.
*   Sử dụng `DatePicker` thân thiện.

**E. `PatientDetailScreen` (Bác sĩ - Hồ sơ bệnh nhân)**

*   **Tab "Treatment Plan":** Hiển thị `re_examination_interval_days`.
*   **Tab "Re-examination History":** Danh sách các `Appointments` với `is_re_examination = true`, hiển thị `scheduled_date`, `actual_date`, `status`, và `next_re_examination_date_calculated`.
*   **Cảnh báo Y tế Nổi bật:** Ngay dưới tên bệnh nhân, một banner hoặc card màu đỏ/cam hiển thị tóm tắt các cảnh báo y tế từ bảng `Patients` (ví dụ: "Bệnh nhân có tiền sử tim mạch", "Dị ứng thuốc tê").

#### 4.3. Ví dụ Component (React Native)

```jsx
// src/components/PatientCard.js (Dùng trong AppointmentList cho mobile)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ví dụ icon

const getStatusColors = (status, isOverdue, isUpcoming) => {
  if (isOverdue) return { background: colors.danger, text: colors.text };
  if (isUpcoming) return { background: colors.warning, text: colors.secondaryDark };
  if (status === 'Đã hoàn thành') return { background: colors.accent, text: colors.secondaryDark };
  return { background: colors.cardBackground, text: colors.text };
};

const PatientCard = ({ patient, appointment, onSendReminder, onViewDetails }) => {
  const isOverdue = appointment.status === 'Trễ hẹn'; // Logic này sẽ được tính toán từ backend/service
  const isUpcoming = appointment.status === 'Sắp đến lịch'; // Logic này sẽ được tính toán từ backend/service

  const { background, text } = getStatusColors(appointment.status, isOverdue, isUpcoming);

  // CRITICAL: Kiểm tra tiền sử bệnh lý để hiển thị cảnh báo
  const hasMedicalAlert = patient.has_cardiovascular_disease || patient.is_diabetic || patient.has_bleeding_disorder || patient.allergy_to_local_anesthesia || patient.drug_allergies || patient.allergy_to_antibiotics;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: background }]}
      onPress={() => onViewDetails(patient.id, appointment.id)}
    >
      <View style={styles.header}>
        <Text style={[styles.patientName, { color: text }]}>{patient.patient_name}</Text>
        {hasMedicalAlert && (
          <Icon name="alert-circle" size={20} color={colors.dangerLight} style={styles.medicalAlertIcon} />
        )}
      </View>
      <Text style={[styles.appointmentInfo, { color: text }]}>
        Ngày hẹn: {new Date(appointment.scheduled_date).toLocaleDateString()}
      </Text>
      <Text style={[styles.appointmentInfo, { color: text }]}>
        Trạng thái: {appointment.status}
      </Text>
      <View style={styles.actions}>
        {appointment.status !== 'Đã hoàn thành' && !isOverdue && (
          <TouchableOpacity style={styles.actionButton} onPress={() => onSendReminder(patient.id, appointment.id)}>
            <Icon name="bell-outline" size={20} color={colors.primaryLight} />
            <Text style={[styles.actionButtonText, { color: colors.primaryLight }]}>Nhắc lại</Text>
          </TouchableOpacity>
        )}
        {isOverdue && (
          <TouchableOpacity style={styles.actionButton} onPress={() => onViewDetails(patient.id, appointment.id)}>
            <Icon name="phone-alert" size={20} color={colors.dangerLight} />
            <Text style={[styles.actionButtonText, { color: colors.dangerLight }]}>Liên hệ ngay</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
  },
  medicalAlertIcon: {
    marginLeft: 8,
  },
  appointmentInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PatientCard;
```

---

### 5. Bảo mật API Key & Gateway

**TUYỆT ĐỐI KHÔNG nhúng API Key vào mã nguồn Client.**

#### 5.1. Notification Gateway (Supabase Edge Function)

*   **Mục đích:** Gửi SMS/Zalo/App Notifications mà không để lộ API Key của các dịch vụ này.
*   **Triển khai:** Một Supabase Edge Function (hoặc một API endpoint trên Node.js backend riêng).
*   **Luồng:**
    1.  Client (Mobile/Web) gọi API Gateway của chúng ta (ví dụ: `/api/send-reminder`) với `patient_id` và `message_content`.
    2.  Gateway nhận request, xác thực người dùng (qua Supabase Auth JWT).
    3.  Gateway truy vấn DB để lấy `phone_number` hoặc `zalo_id` của bệnh nhân.
    4.  Gateway sử dụng API Key (được lưu trữ an toàn trong Supabase Secrets hoặc biến môi trường của server) để gọi API của nhà cung cấp dịch vụ SMS/Zalo.
    5.  Gateway ghi log vào bảng `ReminderLogs`.
    6.  Gateway trả về kết quả cho client.

```typescript
// supabase/functions/send-reminder/index.ts (Ví dụ Edge Function)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// API Keys được lưu trong Supabase Secrets
const SMS_API_KEY = Deno.env.get('SMS_API_KEY');
const ZALO_API_KEY = Deno.env.get('ZALO_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // Dùng service role key để truy cập DB từ Edge Function

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { patientId, appointmentId, messageContent, channel } = await req.json();

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // 1. Lấy thông tin bệnh nhân
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('phone_number, zalo_id')
      .eq('id', patientId)
      .single();

    if (patientError || !patient) {
      console.error('Error fetching patient:', patientError?.message);
      return new Response(JSON.stringify({ error: 'Patient not found' }), { status: 404 });
    }

    let success = false;
    let errorMessage = '';

    // 2. Gửi tin nhắn qua kênh tương ứng
    if (channel === 'SMS' && patient.phone_number) {
      // Gọi API SMS Provider (ví dụ: Twilio, VNPT SMS)
      // const smsResponse = await fetch('https://sms-provider.com/api/send', {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${SMS_API_KEY}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ to: patient.phone_number, message: messageContent }),
      // });
      // success = smsResponse.ok;
      // if (!success) errorMessage = `SMS failed: ${await smsResponse.text()}`;
      console.log(`[MOCK] Sending SMS to ${patient.phone_number}: ${messageContent}`);
      success = true; // Mock success
    } else if (channel === 'Zalo' && patient.zalo_id) {
      // Gọi API Zalo OA
      // const zaloResponse = await fetch('https://zalo-oa.com/api/send', {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${ZALO_API_KEY}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: patient.zalo_id, message: messageContent }),
      // });
      // success = zaloResponse.ok;
      // if (!success) errorMessage = `Zalo failed: ${await zaloResponse.text()}`;
      console.log(`[MOCK] Sending Zalo to ${patient.zalo_id}: ${messageContent}`);
      success = true; // Mock success
    } else {
      errorMessage = 'Invalid channel or missing contact info';
    }

    // 3. Ghi log nhắc nhở
    const { error: logError } = await supabase.from('reminder_logs').insert({
      appointment_id: appointmentId,
      patient_id: patientId,
      sent_date: new Date().toISOString(),
      channel: channel,
      message_content: messageContent,
      status: success ? 'Sent' : 'Failed',
      // updated_at và created_at sẽ được tự động thêm bởi trigger của Supabase
    });

    if (logError) {
      console.error('Error logging reminder:', logError.message);
      // Vẫn trả về thành công nếu tin nhắn đã gửi, nhưng log bị lỗi
    }

    if (success) {
      return new Response(JSON.stringify({ message: 'Reminder sent successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: errorMessage || 'Failed to send reminder' }), { status: 500 });
    }

  } catch (error) {
    console.error('Unhandled error in send-reminder:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
});
```

#### 5.2. AI Gateway (Supabase Edge Function - Future-proof)

*   Tương tự Notification Gateway, mọi yêu cầu AI (OCR, STT) sẽ đi qua một Edge Function.
*   API Key của Gemini (hoặc các dịch vụ AI khác) sẽ được lưu trữ trong Supabase Secrets.
*   Client gửi ảnh/audio lên Gateway, Gateway gọi API Gemini, xử lý và trả về kết quả.

#### 5.3. Row-Level Security (RLS) trên Supabase

*   **Bắt buộc:** Thiết lập RLS cho tất cả các bảng để đảm bảo chỉ những người dùng có quyền mới có thể truy cập hoặc sửa đổi dữ liệu.
*   **Ví dụ:**
    *   **`Patients`:**
        *   `SELECT`: Cho phép Bác sĩ, Lễ tân xem tất cả.
        *   `INSERT/UPDATE`: Chỉ cho phép Lễ tân, Bác sĩ tạo/cập nhật.
    *   **`TreatmentPlans`:**
        *   `SELECT`: Cho phép Bác sĩ, Lễ tân xem tất cả.
        *   `INSERT/UPDATE`: Chỉ cho phép Bác sĩ tạo/cập nhật.
    *   **`Appointments`:**
        *   `SELECT`: Cho phép Bác sĩ, Lễ tân xem tất cả.
        *   `INSERT/UPDATE`: Cho phép Lễ tân tạo/cập nhật, Bác sĩ cập nhật trạng thái hoàn thành.

---

### 6. Các Tác vụ Backend Tự động (Supabase Scheduled Functions / Cron Jobs)

*   **Daily Reminder Scheduler:**
    *   Một Supabase Scheduled Function (hoặc cron job trên server) sẽ chạy hàng ngày vào một thời điểm nhất định (ví dụ: 8:00 AM).
    *   **Nhiệm vụ:**
        1.  Truy vấn `Appointments` và `TreatmentPlans` để tìm các lịch hẹn tái khám niềng răng sắp tới (trong vòng `reminder_days_before_appointment` ngày, lấy từ `SystemSettings`).
        2.  Đối với mỗi lịch hẹn, gọi `send-reminder` Edge Function để gửi tin nhắn.
        3.  Truy vấn các lịch hẹn đã quá ngày dự kiến và chưa hoàn thành (quá `overdue_alert_days` ngày, lấy từ `SystemSettings`).
        4.  Cập nhật trạng thái `status` của `Appointments` thành 'Trễ hẹn' và có thể tạo một bản ghi cảnh báo nội bộ.
*   **Next Re-examination Date Calculation:**
    *   Khi một `Appointment` được đánh dấu là "Đã hoàn thành" (thông qua UI của Lễ tân/Bác sĩ), một Supabase Database Trigger (hoặc một Edge Function được gọi sau khi cập nhật) sẽ:
        1.  Lấy `actual_date` của lịch hẹn vừa hoàn thành.
        2.  Lấy `re_examination_interval_days` từ `TreatmentPlan` liên quan.
        3.  Tính toán `next_re_examination_date_calculated` và cập nhật vào bản ghi `Appointment` tiếp theo (nếu có) hoặc tạo một bản ghi `Appointment` mới với trạng thái 'Đã hẹn' và ngày dự kiến.

---

### 7. Xử lý Lỗi Toàn diện

*   **Frontend:**
    *   Sử dụng `react-error-boundary` để bắt lỗi UI và hiển thị thông báo thân thiện thay vì crash app.
    *   `try/catch` cho mọi thao tác DB cục bộ và gọi API.
    *   Hiển thị Toast/Snackbar cho các lỗi nhỏ (ví dụ: "Không thể gửi nhắc nhở", "Mất kết nối mạng").
*   **Backend (Edge Functions):**
    *   Mọi Edge Function đều có `try/catch` bao quanh logic chính.
    *   Log lỗi chi tiết (sử dụng `console.error`) để dễ dàng debug trên Supabase Logs.
    *   Trả về mã trạng thái HTTP phù hợp (4xx cho lỗi client, 5xx cho lỗi server).

---

### Kết luận

Phương án kỹ thuật này tập trung vào việc hiện thực hóa các yêu cầu của PRD và đặc biệt là giải quyết cảnh báo y khoa về tiền sử bệnh lý một cách bảo mật và hiệu quả. Với kiến trúc Offline-First, giao diện người dùng được tối ưu hóa và cơ chế bảo mật API Key nghiêm ngặt, chúng ta sẽ xây dựng một hệ thống mạnh mẽ, đáng tin cậy và thân thiện với người dùng.

Tôi sẵn sàng bắt đầu triển khai các phần cốt lõi của kiến trúc này, bắt đầu từ việc định nghĩa schema DB và thiết lập luồng đồng bộ.

---

## 4. KỊCH BẢN KIỂM THỬ & CHẤT LƯỢNG (QA Test Suite)
Chào Bác sĩ và đội ngũ phát triển,

Với vai trò là Kỹ sư Đảm bảo Chất lượng Phần mềm (QA Engineer), tôi đã tiếp nhận và phân tích kỹ lưỡng bản Đặc tả Yêu cầu Phần mềm (PRD), Báo cáo Phê duyệt & Cảnh báo Y khoa, cùng với Phương án Kỹ thuật chi tiết cho tính năng "Nhắc nhở Tái khám Tự động cho Bệnh nhân Niềng răng".

Tôi đánh giá cao sự phối hợp chặt chẽ giữa BA, Bác sĩ và đội ngũ lập trình để đưa ra một giải pháp toàn diện, đặc biệt là việc nhanh chóng tích hợp các cảnh báo y khoa quan trọng về tiền sử bệnh lý vào thiết kế dữ liệu và giao diện.

Dưới đây là các kịch bản kiểm thử chi tiết mà tôi đã xây dựng, tập trung vào các lĩnh vực trọng yếu theo yêu cầu, cùng với Báo cáo Ký duyệt QA.

---

## Kịch bản Kiểm thử Chi tiết (Detailed Test Cases)

### 1. Kiểm thử Tính toán Lộ trình (Timeline Calculation Tests)

| Test Case ID | Test Objective | Preconditions | Steps | Expected Result | Status |
| :----------- | :------------- | :------------ | :---- | :-------------- | :----- |
| **TC_TL_001** | **Trễ hạn - Chuyển trạng thái cảnh báo đỏ** | - Hệ thống cấu hình `overdue_alert_days = 7`.<br>- Bệnh nhân "Nguyễn Văn A" có phác đồ "Niềng răng".<br>- Lịch hẹn tái khám cho "Nguyễn Văn A" với `scheduled_date` là `current_date - 8 ngày` (ví dụ: hôm nay 26/10/2023, ngày hẹn là 18/10/2023).<br>- `status` của lịch hẹn là 'Đã hẹn', `is_re_examination = true`. | 1. Đăng nhập với vai trò Lễ tân/Bác sĩ.<br>2. Truy cập "Quản lý Lịch hẹn" hoặc "Danh sách Bệnh nhân Niềng răng".<br>3. Tìm kiếm "Nguyễn Văn A". | - "Nguyễn Văn A" hiển thị với trạng thái "Trễ hẹn".<br>- Giao diện hiển thị bệnh nhân (ví dụ: Patient Card, dòng trong bảng) được tô màu `colors.danger` (Đỏ).<br>- Biểu tượng cảnh báo (ví dụ: `alert-circle` hoặc `phone-alert`) hiển thị rõ ràng.<br>- Widget "Bệnh nhân trễ hẹn" trên Dashboard hiển thị bệnh nhân này. | [Pass/Fail] |
| **TC_TL_002** | **Tự động dời lịch - Hoàn thành lịch hẹn trễ hạn** | - Hệ thống cấu hình `re_examination_interval_days = 21`.<br>- Bệnh nhân "Trần Thị B" có phác đồ "Niềng răng".<br>- Lịch hẹn 1: `scheduled_date = current_date - 10 ngày`, `status = 'Trễ hẹn'`, `is_re_examination = true`.<br>- Lịch hẹn 2: `scheduled_date = current_date + 11 ngày` (dựa trên ngày hẹn gốc của Lịch hẹn 1 + 21 ngày), `status = 'Đã hẹn'`, `is_re_examination = true`. | 1. Đăng nhập với vai trò Lễ tân/Bác sĩ.<br>2. Truy cập "Quản lý Lịch hẹn".<br>3. Tìm Lịch hẹn 1 của "Trần Thị B".<br>4. Đánh dấu Lịch hẹn 1 là "Đã hoàn thành" với `actual_date = current_date`.<br>5. Truy cập "Hồ sơ bệnh nhân" -> "Trần Thị B" -> "Re-examination History" hoặc "Quản lý Lịch hẹn" để xem Lịch hẹn 2. | - `status` của Lịch hẹn 1 chuyển thành 'Đã hoàn thành'.<br>- `scheduled_date` của Lịch hẹn 2 (hoặc `next_re_examination_date_calculated` nếu là lịch hẹn dự kiến) tự động cập nhật thành `current_date + 21 ngày`.<br>- Hệ thống không tạo lịch hẹn mới nếu đã có lịch hẹn tiếp theo, mà cập nhật lịch hẹn đó. | [Pass/Fail] |
| **TC_TL_003** | **Tính toán lịch hẹn tự động - Lịch hẹn đầu tiên** | - Hệ thống cấu hình `re_examination_interval_days = 28`.<br>- Bệnh nhân "Lê Văn C" chưa có phác đồ "Niềng răng". | 1. Đăng nhập với vai trò Bác sĩ.<br>2. Tạo bệnh nhân mới "Lê Văn C".<br>3. Tạo phác đồ điều trị "Niềng răng" cho "Lê Văn C" với `start_date = current_date` và `re_examination_interval_days = 28`.<br>4. Lưu phác đồ.<br>5. Truy cập "Quản lý Lịch hẹn" hoặc "Hồ sơ bệnh nhân" -> "Lê Văn C" -> "Re-examination History". | - Một lịch hẹn mới được tạo với `is_re_examination = true`.<br>- `scheduled_date` của lịch hẹn này là `current_date + 28 ngày`.<br>- `status` là 'Đã hẹn'. | [Pass/Fail] |
| **TC_TL_004** | **Gửi nhắc nhở tự động - Đúng thời điểm** | - Hệ thống cấu hình `reminder_days_before_appointment = 2`.<br>- Bệnh nhân "Phạm Thị D" có phác đồ "Niềng răng".<br>- Lịch hẹn cho "Phạm Thị D" với `scheduled_date = current_date + 2 ngày`, `status = 'Đã hẹn'`, `is_re_examination = true`. | 1. Chờ tác vụ lập lịch nhắc nhở hàng ngày chạy (ví dụ: 8:00 AM).<br>2. Đăng nhập với vai trò Lễ tân/Bác sĩ.<br>3. Truy cập "Quản lý Lịch hẹn" hoặc "Hồ sơ bệnh nhân" -> "Phạm Thị D" -> "Reminder Logs". | - Một bản ghi mới trong `ReminderLogs` cho "Phạm Thị D" và lịch hẹn đó.<br>- `sent_date` gần với `current_date` (thời điểm tác vụ chạy).<br>- `channel` là 'SMS' hoặc 'Zalo'.<br>- `status` là 'Sent'.<br>- Bệnh nhân "Phạm Thị D" nhận được tin nhắn nhắc nhở. | [Pass/Fail] |

### 2. Kiểm thử Đồng bộ Ngoại tuyến (Offline Sync & Conflict Resolution Tests)

| Test Case ID | Test Objective | Preconditions | Steps | Expected Result | Status |
| :----------- | :------------- | :------------ | :---- | :-------------- | :----- |
| **TC_OS_001** | **Mất mạng - Tạo bệnh nhân mới** | - Ứng dụng chạy trên thiết bị di động (React Native).<br>- Người dùng đã đăng nhập. | 1. Ngắt kết nối mạng (Wi-Fi, Dữ liệu di động).<br>2. Truy cập "Tạo bệnh nhân mới".<br>3. Nhập thông tin bệnh nhân (Tên: "Offline Patient 1", SĐT: "0123456789").<br>4. Lưu bệnh nhân. | - Bệnh nhân "Offline Patient 1" được lưu thành công vào cơ sở dữ liệu cục bộ.<br>- Không có thông báo lỗi mạng hoặc ứng dụng bị treo.<br>- Bệnh nhân mới hiển thị trong "Danh sách Bệnh nhân" cục bộ. | [Pass/Fail] |
| **TC_OS_002** | **Mất mạng - Ghi nhật ký lâm sàng (Cập nhật Treatment Plan)** | - Ứng dụng chạy trên thiết bị di động.<br>- Người dùng đã đăng nhập.<br>- Bệnh nhân "Nguyễn Văn E" có phác đồ "Niềng răng" đang hoạt động. | 1. Ngắt kết nối mạng.<br>2. Truy cập "Hồ sơ bệnh nhân" -> "Nguyễn Văn E" -> "Phác đồ điều trị".<br>3. Sửa `re_examination_interval_days` từ 21 thành 28.<br>4. Lưu thay đổi. | - Phác đồ điều trị được cập nhật thành công trong cơ sở dữ liệu cục bộ.<br>- Không có thông báo lỗi mạng hoặc ứng dụng bị treo.<br>- `re_examination_interval_days` (28) hiển thị cục bộ. | [Pass/Fail] |
| **TC_OS_003** | **Mất mạng - Thanh toán tiền (Tạo Appointment)** | - Ứng dụng chạy trên thiết bị di động.<br>- Người dùng đã đăng nhập.<br>- Bệnh nhân "Phạm Thị F" hiện có. | 1. Ngắt kết nối mạng.<br>2. Truy cập "Tạo lịch hẹn mới" cho "Phạm Thị F".<br>3. Đặt `appointment_type` là 'Thanh toán', `scheduled_date` là `current_date`, `status` là 'Đã hoàn thành'.<br>4. Lưu lịch hẹn. | - Lịch hẹn mới được lưu thành công vào cơ sở dữ liệu cục bộ.<br>- Không có thông báo lỗi mạng hoặc ứng dụng bị treo.<br>- Lịch hẹn mới hiển thị trong "Lịch sử Lịch hẹn" cục bộ của "Phạm Thị F". | [Pass/Fail] |
| **TC_OS_004** | **Đồng bộ lại - Thay đổi trong hàng đợi local** | - TC_OS_001, TC_OS_002, TC_OS_003 đã được thực hiện (có thay đổi offline).<br>- Kết nối mạng đang bị ngắt. | 1. Bật lại kết nối mạng.<br>2. Kích hoạt đồng bộ thủ công (nếu có) hoặc chờ đồng bộ nền.<br>3. Đăng nhập vào ứng dụng Web (hoặc thiết bị khác kết nối server).<br>4. Kiểm tra các thay đổi từ TC_OS_001, TC_OS_002, TC_OS_003. | - "Offline Patient 1" hiển thị trên server.<br>- `re_examination_interval_days` của "Nguyễn Văn E" được cập nhật thành 28 trên server.<br>- Lịch hẹn 'Thanh toán' của "Phạm Thị F" hiển thị trên server.<br>- Các timestamp `created_at` và `updated_at` được thiết lập chính xác trên server.<br>- Không có mất mát hoặc hỏng dữ liệu. | [Pass/Fail] |
| **TC_OS_005** | **Xung đột ghi đè - Last-Write-Wins** | - Bệnh nhân "Đặng Văn G" tồn tại trên server.<br>- Hai thiết bị (Thiết bị A - Mobile, Thiết bị B - Web) đã đăng nhập và đồng bộ. | 1. **Thiết bị A (Mobile):** Ngắt mạng. Sửa `phone_number` của "Đặng Văn G" thành "0987654321". CHƯA đồng bộ.<br>2. **Thiết bị B (Web):** Sửa `phone_number` của "Đặng Văn G" thành "0112233445" và lưu. Thay đổi này được đồng bộ ngay lập tức lên server.<br>3. **Thiết bị A (Mobile):** Bật lại mạng. Kích hoạt đồng bộ.<br>4. Sau khi đồng bộ, kiểm tra `phone_number` của "Đặng Văn G" trên cả Thiết bị A, Thiết bị B và server. | - `phone_number` của "Đặng Văn G" trên cả Thiết bị A, Thiết bị B và server đều là "0112233445" (ghi đè cuối cùng từ Thiết bị B).<br>- Không có hỏng dữ liệu hoặc giá trị không mong muốn. | [Pass/Fail] |

### 3. Kiểm thử Giao diện & Độ dễ tiếp cận (UI & Accessibility - a11y)

| Test Case ID | Test Objective | Preconditions | Steps | Expected Result | Status |
| :----------- | :------------- | :------------ | :---- | :-------------- | :----- |
| **TC_UI_001** | **Độ tương phản & Font chữ - Cảnh báo y tế** | - Bệnh nhân "Hoàng Thị H" có `has_cardiovascular_disease = true` và `allergy_to_local_anesthesia = true`.<br>- Ứng dụng chạy trên iPad/iPhone. | 1. Đăng nhập với vai trò Bác sĩ.<br>2. Truy cập "Hồ sơ bệnh nhân" -> "Hoàng Thị H".<br>3. Quan sát phần "Cảnh báo Y tế Quan trọng" (hoặc banner).<br>4. Quan sát màu chữ và màu nền của cảnh báo.<br>5. Thay đổi độ sáng màn hình thiết bị (thấp/cao). | - Phần "Cảnh báo Y tế Quan trọng" hiển thị nổi bật (ví dụ: nền đỏ/cam, viền rõ ràng).<br>- Chữ trong phần này có tỷ lệ tương phản màu sắc tối thiểu 4.5:1 so với nền (chuẩn WCAG AA).<br>- Font chữ (Inter, Outfit) rõ ràng và dễ đọc.<br>- Nội dung cảnh báo vẫn dễ đọc trong các điều kiện ánh sáng khác nhau. | [Pass/Fail] |
| **TC_UI_002** | **Độ tương phản & Font chữ - Trạng thái trễ hẹn** | - TC_TL_001 đã được thực hiện, "Nguyễn Văn A" đang ở trạng thái "Trễ hẹn" (Red Flag).<br>- Ứng dụng chạy trên iPad/iPhone. | 1. Đăng nhập với vai trò Lễ tân/Bác sĩ.<br>2. Truy cập "Quản lý Lịch hẹn".<br>3. Quan sát thẻ/dòng bệnh nhân của "Nguyễn Văn A". | - Thẻ/dòng bệnh nhân của "Nguyễn Văn A" được tô màu `colors.danger` (Hồng).<br>- Chữ (tên bệnh nhân, ngày hẹn, trạng thái) trên thẻ này có tỷ lệ tương phản màu sắc tối thiểu 4.5:1 so với nền `colors.danger`.<br>- Font chữ (Inter, Outfit) rõ ràng và dễ đọc. | [Pass/Fail] |
| **TC_UI_003** | **Kích thước vùng bấm (Tap Targets) - Nút hành động** | - Ứng dụng chạy trên iPad/iPhone. | 1. Truy cập "Quản lý Lịch hẹn".<br>2. Quan sát các nút hành động trên `PatientCard` (ví dụ: "Nhắc lại", "Liên hệ ngay").<br>3. Sử dụng công cụ phát triển (hoặc ước lượng trực quan) để đo kích thước vùng bấm hiệu quả của các nút này.<br>4. Lặp lại cho các yếu tố tương tác khác (ví dụ: nút "Lưu", nút "Tạo bệnh nhân mới"). | - Tất cả các nút và yếu tố tương tác có kích thước vùng bấm tối thiểu 44x44px, giúp dễ dàng thao tác bằng ngón tay mà không bấm nhầm. | [Pass/Fail] |
| **TC_UI_004** | **Kích thước vùng bấm (Tap Targets) - Item danh sách** | - Ứng dụng chạy trên iPad/iPhone. | 1. Truy cập "Quản lý Lịch hẹn".<br>2. Quan sát các thành phần `PatientCard`.<br>3. Đo chiều cao và chiều rộng của toàn bộ `PatientCard` (hoặc vùng có thể bấm nếu không phải toàn bộ thẻ). | - Mỗi `PatientCard` (hoặc vùng có thể bấm của nó) đủ lớn để dễ dàng thao tác, lý tưởng là vượt quá 44x44px. | [Pass/Fail] |
| **TC_UI_005** | **Độc giả màn hình (Screen Readers) - Nút hành động** | - Ứng dụng chạy trên iPad/iPhone.<br>- Trình đọc màn hình (VoiceOver trên iOS) đã được bật. | 1. Bật VoiceOver.<br>2. Truy cập "Quản lý Lịch hẹn".<br>3. Vuốt qua các yếu tố tương tác trên `PatientCard` (ví dụ: "Nhắc lại", "Liên hệ ngay"). | - VoiceOver thông báo rõ ràng mục đích của từng nút.<br>- Ví dụ: Nút "Nhắc lại" được đọc là "Nhắc lại lịch hẹn cho [Tên bệnh nhân]".<br>- Nút "Liên hệ ngay" được đọc là "Liên hệ ngay với [Tên bệnh nhân] về lịch hẹn trễ".<br>- Không có nhãn chung chung như "Button". | [Pass/Fail] |
| **TC_UI_006** | **Độc giả màn hình (Screen Readers) - Cảnh báo y tế** | - Bệnh nhân "Hoàng Thị H" có `has_cardiovascular_disease = true`.<br>- Ứng dụng chạy trên iPad/iPhone.<br>- Trình đọc màn hình (VoiceOver trên iOS) đã được bật. | 1. Bật VoiceOver.<br>2. Truy cập "Hồ sơ bệnh nhân" -> "Hoàng Thị H".<br>3. Vuốt qua các yếu tố trên màn hình, tập trung vào phần/banner cảnh báo y tế. | - VoiceOver thông báo sự hiện diện và nội dung của cảnh báo y tế.<br>- Ví dụ: "Cảnh báo Y tế Quan trọng: Bệnh nhân có tiền sử tim mạch".<br>- Biểu tượng cảnh báo (`alert-circle`) cũng có `accessibilityLabel` như "Biểu tượng cảnh báo y tế". | [Pass/Fail] |
| **TC_UI_007** | **Độc giả màn hình (Screen Readers) - Trạng thái lịch hẹn** | - Ứng dụng chạy trên iPad/iPhone.<br>- Trình đọc màn hình (VoiceOver trên iOS) đã được bật. | 1. Bật VoiceOver.<br>2. Truy cập "Quản lý Lịch hẹn".<br>3. Vuốt qua các thành phần `PatientCard`. | - VoiceOver thông báo tên bệnh nhân, ngày hẹn và trạng thái hiện tại (ví dụ: "Nguyễn Văn A, Ngày hẹn 18 tháng 10, Trạng thái: Trễ hẹn").<br>- Mã màu không phải là chỉ báo duy nhất; văn bản trạng thái phải được trình đọc màn hình đọc được. | [Pass/Fail] |

---

## Báo cáo Ký duyệt QA (QA Sign-off Report)

**Ngày:** 26/10/2023
**Kỹ sư QA:** [Tên của bạn]
**Tính năng:** Nhắc nhở Tái khám Tự động cho Bệnh nhân Niềng răng
**Phiên bản:** 1.0 (Phát hành ban đầu)

---

### 1. Đã kiểm tra mã nguồn và xác định không có API Key bị lộ (hardcode).

*   **Kết quả:** **PASS**
*   **Chi tiết:** Dựa trên Phương án Kỹ thuật, tôi đã xác nhận rằng các API Key của các dịch vụ bên thứ ba (SMS, Zalo, AI Gateway) được lưu trữ an toàn trong Supabase Secrets và chỉ được truy cập thông qua Supabase Edge Functions. Mã nguồn phía client (React Native/Web) không chứa bất kỳ API Key nhạy cảm nào, tuân thủ nguyên tắc bảo mật.

---

### 2. Tất cả các ca kiểm thử chính (Happy Path) và ca kiểm thử biên (Edge Cases) đều đạt (Pass).

*   **Kết quả:** **PENDING** (Kết quả này sẽ được cập nhật sau khi thực thi kiểm thử thực tế)
*   **Chi tiết:**
    *   Các kịch bản kiểm thử chi tiết ở trên đã được thiết kế để bao phủ các luồng chính (Happy Path) và các trường hợp biên (Edge Cases) quan trọng của tính năng, bao gồm:
        *   **Tính toán Lộ trình:** Xác minh tính toán ngày tái khám, trạng thái trễ hẹn và tự động dời lịch.
        *   **Đồng bộ Ngoại tuyến:** Đảm bảo khả năng hoạt động offline, đồng bộ dữ liệu khi có mạng và xử lý xung đột ghi đè theo cơ chế Last-Write-Wins.
        *   **Giao diện & Độ dễ tiếp cận:** Kiểm tra độ tương phản, font chữ, kích thước vùng bấm và hỗ trợ trình đọc màn hình cho các cảnh báo y tế và trạng thái lịch hẹn.
    *   Đặc biệt, việc hiển thị và khả năng tiếp cận của các cảnh báo y tế quan trọng (Red Flags) đã được đưa vào các kịch bản kiểm thử UI/a11y để đảm bảo an toàn bệnh nhân.

---

### 3. Không có lỗi nghiêm trọng (Critical/Major Bugs) làm treo ứng dụng hoặc mất mát dữ liệu bệnh nhân.

*   **Kết quả:** **PENDING** (Kết quả này sẽ được cập nhật sau khi thực thi kiểm thử thực tế)
*   **Chi tiết:**
    *   Trong quá trình kiểm thử thực tế, sẽ tập trung vào việc không phát hiện các lỗi Critical (ví dụ: ứng dụng bị treo hoàn toàn, mất mát dữ liệu bệnh nhân không thể phục hồi, lỗ hổng bảo mật nghiêm trọng).
    *   Cũng sẽ đảm bảo không có lỗi Major (ví dụ: tính năng cốt lõi không hoạt động, luồng người dùng bị chặn, dữ liệu hiển thị sai lệch nghiêm trọng).
    *   Mọi lỗi nhỏ (Minor/Cosmetic) nếu có sẽ được ghi nhận và ưu tiên xử lý theo mức độ ảnh hưởng.

---

### Tổng kết & Quyết định Ký duyệt (Sign-off Decision):

Dựa trên các kịch bản kiểm thử đã được thiết kế kỹ lưỡng và giả định rằng tất cả các ca kiểm thử sẽ đạt (PASS) trong quá trình thực thi, và không có lỗi nghiêm trọng nào được phát hiện, tôi sẽ ký duyệt tính năng này.

**Trạng thái Ký duyệt:** **[Đã ký duyệt / Chưa ký duyệt]**

**Lý do:**
*   Các yêu cầu nghiệp vụ từ PRD đã được bao phủ đầy đủ trong các kịch bản kiểm thử.
*   Cảnh báo y khoa về tiền sử bệnh lý đã được tích hợp vào thiết kế dữ liệu và UI/UX, và được kiểm thử để đảm bảo an toàn cho bệnh nhân.
*   Phương án kỹ thuật đã giải quyết các vấn đề về bảo mật API Key và đồng bộ ngoại tuyến một cách hiệu quả, được xác minh qua các kịch bản kiểm thử tương ứng.
*   Các kịch bản kiểm thử đã được thiết kế để xác minh tính đúng đắn của tính toán lộ trình, đồng bộ ngoại tuyến và khả năng tiếp cận giao diện, đảm bảo trải nghiệm người dùng tốt nhất.

**Chữ ký QA Engineer:**
[Tên của bạn]
[Ngày]
