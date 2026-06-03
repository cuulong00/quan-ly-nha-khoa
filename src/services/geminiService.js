/**
 * SERVICE HƯỚNG DẪN TÍCH HỢP GEMINI API KEY CHUYÊN NGHIỆP
 * 
 * Bác sĩ có thể sử dụng file này sau này khi tích hợp API Key thực tế vào Server.
 * Thư viện yêu cầu: npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Khởi tạo SDK bằng API Key (Lưu ý: API Key nên lưu trữ ở Server để tránh lộ bảo mật)
const initGemini = (apiKey) => {
  return new GoogleGenerativeAI(apiKey);
};

/**
 * 1. HÀM XỬ LÝ QUÉT HỒ SƠ GIẤY (VISION OCR)
 * Gửi ảnh chụp hồ sơ giấy sang Gemini để trích xuất JSON cấu trúc.
 * 
 * @param {string} apiKey - API Key của Gemini
 * @param {string} imageBase64 - Ảnh chụp dạng Base64
 * @param {string} mimeType - Định dạng ảnh (ví dụ: 'image/jpeg' hoặc 'image/png')
 */
export const scanPaperRecord = async (apiKey, imageBase64, mimeType = 'image/jpeg') => {
  try {
    const genAI = initGemini(apiKey);
    
    // Sử dụng mô hình gemini-2.5-flash / gemini-1.5-flash tối ưu cho tốc độ và chi phí
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // Ép kiểu đầu ra luôn là JSON để Server/App dễ dàng xử lý
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      Bạn là trợ lý AI chuyên khoa Nha khoa. Hãy quét hình ảnh bệnh án giấy được gửi kèm và trích xuất dữ liệu cấu trúc dưới định dạng JSON sau:
      {
        "name": "Tên đầy đủ của bệnh nhân",
        "phone": "Số điện thoại liên hệ",
        "dob": "Ngày sinh dạng YYYY-MM-DD (nếu chỉ có năm sinh thì ghi YYYY-01-01)",
        "medicalHistory": "Mô tả tiền sử dị ứng thuốc, bệnh nền nếu có",
        "treatmentType": "Phân loại vào 1 trong các nhóm sau: 'orthodontics' (Chỉnh nha/niềng răng), 'implant' (Cấy implant), 'root_canal' (Điều trị tủy), 'periodontics' (Nha chu), hoặc 'general' (Hàn răng/Tổng quát)"
      }
      Lưu ý: Chỉ trả về JSON duy nhất, không thêm ký tự markdown hay giải thích nào khác ngoài chuỗi JSON.
    `;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // Parse chuỗi JSON nhận được từ Gemini
    return JSON.parse(text);
  } catch (error) {
    console.error("Lỗi khi quét hồ sơ qua Gemini API:", error);
    throw error;
  }
};

/**
 * 2. HÀM PHÂN TÍCH KHẨU LỆNH GIỌNG NÓI (NLP INTERPRETATION)
 * Gửi văn bản sau khi chuyển từ giọng nói (Speech-to-Text) sang Gemini để trích xuất hành động.
 * 
 * @param {string} apiKey - API Key của Gemini
 * @param {string} transcript - Đoạn văn bản bác sĩ vừa đọc
 */
export const parseVoiceCommand = async (apiKey, transcript) => {
  try {
    const genAI = initGemini(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      Hãy phân tích khẩu lệnh của bác sĩ nha khoa sau đây: "${transcript}"
      Dựa trên khẩu lệnh, hãy phân loại hành động và trích xuất thông tin cấu trúc dưới định dạng JSON sau:
      {
        "actionType": "Một trong các giá trị: 'add_patient' (nếu muốn thêm bệnh nhân mới), 'update_tooth' (nếu muốn cập nhật bệnh lý của 1 răng cụ thể), hoặc 'complete_step' (nếu muốn đánh dấu xong bước điều trị hiện tại)",
        "extractedData": {
          // Nếu là 'add_patient':
          "name": "Tên bệnh nhân",
          "phone": "Số điện thoại",
          "dob": "Ngày sinh YYYY-MM-DD",
          "treatmentType": "Loại điều trị ('orthodontics', 'implant', 'root_canal', 'periodontics', 'general')",
          
          // Nếu là 'update_tooth':
          "tooth": "Số răng (số nguyên từ 11 đến 48 theo hệ FDI)",
          "state": "Trạng thái bệnh lý: 'needs_fillings' (sâu răng/cần hàn), 'has_issue' (viêm tủy), 'needs_implant' (mất răng), hoặc 'healthy' (răng khoẻ/bình thường)"
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Lỗi phân tích khẩu lệnh giọng nói:", error);
    throw error;
  }
};
