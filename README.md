# Dental Clinic Manager (Quản lý Phòng khám Nha khoa)

Chào mừng bạn đến với dự án **Dental Clinic Manager** - Ứng dụng quản lý kế hoạch điều trị nha khoa cho bệnh nhân, hỗ trợ quy trình vận hành tự động thông qua đội ngũ AI Agent.

---

## 🚀 Đội ngũ AI Agent & Quy trình SOP
Dự án được thiết kế để phát triển và kiểm thử tự động bởi hệ thống các AI Agent chuyên biệt.

*   **Quy trình Vận hành Chuẩn (SOP)**: Chi tiết tại [SOP.md](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/SOP.md).
*   **Các Vai trò Agent Persona (Thư mục [personas](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/))**:
    *   [Project Manager (PM)](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/ProjectManager.md): Theo sát lộ trình, điều phối các agent khác.
    *   [Business Analyst (BA)](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/BusinessAnalyst.md): Phân tích nghiệp vụ, soạn PRD.
    *   [Dental Specialist](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/DentalSpecialist.md): Thẩm định y khoa lâm sàng nha khoa.
    *   [Developer](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/Developer.md): Thiết kế cơ sở dữ liệu và lập trình.
    *   [QA/Tester](file:///Users/pro16/Documents/Code/Dental-clinic-manager/agents/personas/QATester.md): Viết testcase, chạy kiểm thử giao diện & a11y.

---

## 🌐 Môi trường VPS & Cấu hình SSH Kết nối
Dự án đã cấu hình và tích hợp thành công kết nối tới máy chủ VPS phục vụ môi trường Production/Staging.

### 1. Thông tin VPS
*   **IP Host**: `69.197.187.234`
*   **Username**: `administrator` (Ubuntu Server)
*   **Hệ điều hành**: Ubuntu Linux (Kernel 6.8.0)

### 2. Trạng thái cấu hình SSH Key (Đăng nhập không cần mật khẩu)
Khóa SSH của máy Mac này đã được cài đặt thành công vào danh sách tin cậy (`~/.ssh/authorized_keys`) của VPS.
*   **Local Private Key**: `~/.ssh/id_ed25519`
*   **Lệnh kết nối/thao tác nhanh của Agent từ Terminal**:
    ```bash
    ssh -o StrictHostKeyChecking=no administrator@69.197.187.234 "lệnh_cần_chạy"
    ```

### 3. Sự cố ổ đĩa đã xử lý (Ghi nhớ cho các Agent)
*   **Hiện trạng ban đầu**: Ổ đĩa `/` trên VPS bị đầy 100% (142GB) khiến SSH không thể ghi file hoặc khởi chạy các phiên làm việc bình thường.
*   **Nguyên nhân**: File log của container Docker `chat_bot_server_aladin_chatbot_1` phình to chiếm tới **39GB** tại đường dẫn `/var/lib/docker/containers/8f29e3cf4a6ab2177d77c40dbc38f074310513e80c7c9c9747032ead401055e6/8f29e3cf4a6ab2177d77c40dbc38f074310513e80c7c9c9747032ead401055e6-json.log`.
*   **Xử lý**: Đã chạy lệnh `sudo truncate -s 0` để dọn sạch log này mà không làm sập container. Hiện tại đĩa trống **33GB** (sử dụng 77%).

---

## 🛠️ Công nghệ sử dụng (Stack)
*   **Frontend**: React, Vite
*   **Styling**: Vanilla CSS (TailwindCSS chỉ dùng khi có yêu cầu cụ thể)
*   **Icons**: Lucide React
*   **Môi trường server**: Docker, Node.js, PostgreSQL, Neo4j, Nginx (chạy trên VPS)
