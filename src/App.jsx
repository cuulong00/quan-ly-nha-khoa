import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Activity, 
  Search, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Check, 
  FileText, 
  ShieldAlert,
  Database,
  ArrowRight,
  Sparkles,
  Info,
  X,
  Camera,
  Mic,
  Brain,
  Volume2
} from 'lucide-react';

// --- MOCK CONSTANTS FOR INITIAL DATA ---
const CLINICAL_ROADMAPS = {
  orthodontics: {
    name: 'Chỉnh nha (Niềng răng)',
    steps: [
      { stepNumber: 1, title: 'Đặt thun tách kẽ', description: 'Đặt thun vào kẽ răng cối để chuẩn bị đặt khâu.', daysInterval: 7 },
      { stepNumber: 2, title: 'Gắn mắc cài & đi dây cung nhẹ', description: 'Gắn mắc cài hai hàm, đi dây Niti kích thước nhỏ.', daysInterval: 30 },
      { stepNumber: 3, title: 'Thay dây cung đợt 1 (Lực vừa)', description: 'Kiểm tra răng di chuyển, thay dây cung lớn hơn.', daysInterval: 30 },
      { stepNumber: 4, title: 'Nhổ răng tạo khoảng (nếu có)', description: 'Nhổ răng số 4/5 theo phác đồ tạo khoảng đóng hô.', daysInterval: 30 },
      { stepNumber: 5, title: 'Kéo đóng khoảng (Lò xo/Chun chuỗi)', description: 'Bắt đầu dùng chun kéo đóng khoảng nhổ răng.', daysInterval: 60 },
      { stepNumber: 6, title: 'Tinh chỉnh khớp cắn', description: 'Đi dây cung hoàn thiện, tinh chỉnh khớp cắn hai hàm.', daysInterval: 60 },
      { stepNumber: 7, title: 'Tháo mắc cài & đeo hàm duy trì', description: 'Tháo niềng, vệ sinh răng và lấy dấu làm hàm duy trì.', daysInterval: 30 }
    ]
  },
  implant: {
    name: 'Cấy ghép Implant',
    steps: [
      { stepNumber: 1, title: 'Nhổ răng & Ghép xương ổ', description: 'Nhổ răng hỏng, làm sạch ổ xương và ghép xương tự tiêu.', daysInterval: 90 },
      { stepNumber: 2, title: 'Phẫu thuật cấy trụ Implant', description: 'Đặt trụ implant vào xương hàm dưới hướng dẫn định vị.', daysInterval: 90 },
      { stepNumber: 3, title: 'Đặt Healing Abutment', description: 'Mở nướu đặt vít lành thương tạo đường viền nướu.', daysInterval: 14 },
      { stepNumber: 4, title: 'Lấy dấu cùi răng giả & chọn Abutment', description: 'Quét dấu hoặc lấy dấu cao su bơm silicon lấy khớp cắn.', daysInterval: 7 },
      { stepNumber: 5, title: 'Lắp mão sứ cố định trên Implant', description: 'Thử răng sứ, tinh chỉnh cắn khớp và siết ốc cố định mão răng.', daysInterval: 7 }
    ]
  },
  root_canal: {
    name: 'Điều trị tủy (Nội nha)',
    steps: [
      { stepNumber: 1, title: 'Mở tủy & Đặt thuốc diệt tủy', description: 'Lấy sạch sâu răng, mở buồng tủy và đặt thuốc diệt tủy.', daysInterval: 7 },
      { stepNumber: 2, title: 'Sửa soạn ống tủy & Bơm rửa', description: 'Đo chiều dài làm việc, tạo hình ống tủy bằng trâm quay.', daysInterval: 7 },
      { stepNumber: 3, title: 'Trám bít ống tủy (Gutta Percha)', description: 'Trám bít ống tủy bằng gutta-percha và sealant chuyên dụng.', daysInterval: 7 },
      { stepNumber: 4, title: 'Bọc răng sứ bảo vệ (Phục hình)', description: 'Mài cùi răng, lấy dấu và bọc sứ để tránh nứt vỡ răng chết tủy.', daysInterval: 10 }
    ]
  },
  periodontics: {
    name: 'Điều trị Nha chu',
    steps: [
      { stepNumber: 1, title: 'Lấy cao răng & Nạo túi lợi nông', description: 'Làm sạch mảng bám, xử lý bề mặt gốc răng dưới nướu.', daysInterval: 14 },
      { stepNumber: 2, title: 'Nạo túi nha chu sâu đợt 2', description: 'Làm sạch túi nha chu sâu dưới gây tê vùng.', daysInterval: 30 },
      { stepNumber: 3, title: 'Đánh giá lại & Ghép mô liên kết', description: 'Kiểm tra độ sâu túi, tiến hành phẫu thuật ghép nướu nếu tụt lợi.', daysInterval: 45 }
    ]
  },
  general: {
    name: 'Hàn răng & Tổng quát',
    steps: [
      { stepNumber: 1, title: 'Lấy cao răng & Vệ sinh tổng quát', description: 'Làm sạch cao răng mảng bám hai hàm.', daysInterval: 7 },
      { stepNumber: 2, title: 'Hàn các răng sâu bệnh lý', description: 'Hàn composite phục hồi các răng sâu men/sâu ngà.', daysInterval: 14 }
    ]
  }
};

const INITIAL_PATIENTS = [
  {
    id: 'p1',
    name: 'Nguyễn Hoàng Nam',
    phone: '0912345678',
    dob: '1995-04-12',
    medicalHistory: 'Không có dị ứng, huyết áp bình thường',
    treatmentType: 'orthodontics',
    status: 'delayed', // delayed, on_track, completed
    teethState: {
      11: 'needs_fillings',
      16: 'has_issue',
      36: 'needs_implant',
      46: 'completed'
    },
    billing: {
      totalCost: 35000000,
      paidAmount: 15000000
    },
    clinicalNotes: [
      { id: 'n1', date: '2026-04-10', content: 'Khám lâm sàng & chụp phim Cephalo. Bệnh nhân bị hô xương hạng II. Tiến hành đặt thun tách kẽ răng cối.', doctor: 'BS. Đức' },
      { id: 'n2', date: '2026-05-10', content: 'Tháo thun tách kẽ, gắn band răng cối. Tiến hành đi dây cung Niti 0.012 kích hoạt đều hai hàm.', doctor: 'BS. Đức' }
    ],
    timeline: [
      { stepNumber: 1, title: 'Đặt thun tách kẽ', description: 'Đặt thun vào kẽ răng cối để chuẩn bị đặt khâu.', daysInterval: 7, status: 'completed', actualCompletedDate: '2026-04-10', targetDate: '2026-04-10' },
      { stepNumber: 2, title: 'Gắn mắc cài & đi dây cung nhẹ', description: 'Gắn mắc cài hai hàm, đi dây Niti kích thước nhỏ.', daysInterval: 30, status: 'completed', actualCompletedDate: '2026-05-10', targetDate: '2026-05-10' },
      { stepNumber: 3, title: 'Thay dây cung đợt 1 (Lực vừa)', description: 'Kiểm tra răng di chuyển, thay dây cung lớn hơn.', daysInterval: 30, status: 'in_progress', targetDate: '2026-05-25' }, // Past targetDate (current is 2026-06-03), so delayed!
      { stepNumber: 4, title: 'Nhổ răng tạo khoảng (nếu có)', description: 'Nhổ răng số 4/5 theo phác đồ tạo khoảng đóng hô.', daysInterval: 30, status: 'pending', targetDate: '2026-06-24' },
      { stepNumber: 5, title: 'Kéo đóng khoảng (Lò xo/Chun chuỗi)', description: 'Bắt đầu dùng chun kéo đóng khoảng nhổ răng.', daysInterval: 60, status: 'pending', targetDate: '2026-08-23' },
      { stepNumber: 6, title: 'Tinh chỉnh khớp cắn', description: 'Đi dây cung hoàn thiện, tinh chỉnh khớp cắn hai hàm.', daysInterval: 60, status: 'pending', targetDate: '2026-10-22' },
      { stepNumber: 7, title: 'Tháo mắc cài & đeo hàm duy trì', description: 'Tháo niềng, vệ sinh răng và lấy dấu làm hàm duy trì.', daysInterval: 30, status: 'pending', targetDate: '2026-11-21' }
    ]
  },
  {
    id: 'p2',
    name: 'Trần Thị Thu Trang',
    phone: '0987654321',
    dob: '1988-11-23',
    medicalHistory: 'Dị ứng nhẹ với thuốc giảm đau Aspirin',
    treatmentType: 'implant',
    status: 'on_track',
    teethState: {
      36: 'needs_implant',
      47: 'needs_fillings'
    },
    billing: {
      totalCost: 18000000,
      paidAmount: 10000000
    },
    clinicalNotes: [
      { id: 'n3', date: '2026-03-01', content: 'Nhổ chân răng 36 đã tiêu hết xương vách ngăn. Bơm rửa sạch ổ răng, tiến hành đặt bột xương nhân tạo tự tiêu.', doctor: 'BS. Đức' }
    ],
    timeline: [
      { stepNumber: 1, title: 'Nhổ răng & Ghép xương ổ', description: 'Nhổ răng hỏng, làm sạch ổ xương và ghép xương tự tiêu.', daysInterval: 90, status: 'completed', actualCompletedDate: '2026-03-01', targetDate: '2026-03-01' },
      { stepNumber: 2, title: 'Phẫu thuật cấy trụ Implant', description: 'Đặt trụ implant vào xương hàm dưới hướng dẫn định vị.', daysInterval: 90, status: 'in_progress', targetDate: '2026-06-15' }, // Future date (June 15), so on track!
      { stepNumber: 3, title: 'Đặt Healing Abutment', description: 'Mở nướu đặt vít lành thương tạo đường viền nướu.', daysInterval: 14, status: 'pending', targetDate: '2026-06-29' },
      { stepNumber: 4, title: 'Lấy dấu cùi răng giả & chọn Abutment', description: 'Quét dấu hoặc lấy dấu cao su bơm silicon lấy khớp cắn.', daysInterval: 7, status: 'pending', targetDate: '2026-07-06' },
      { stepNumber: 5, title: 'Lắp mão sứ cố định trên Implant', description: 'Thử răng sứ, tinh chỉnh cắn khớp và siết ốc cố định mão răng.', daysInterval: 7, status: 'pending', targetDate: '2026-07-13' }
    ]
  },
  {
    id: 'p3',
    name: 'Phạm Minh Quân',
    phone: '0905123987',
    dob: '2001-09-05',
    medicalHistory: 'Không tiền sử bệnh nền',
    treatmentType: 'root_canal',
    status: 'completed',
    teethState: {
      46: 'completed'
    },
    billing: {
      totalCost: 5000000,
      paidAmount: 5000000
    },
    clinicalNotes: [
      { id: 'n4', date: '2026-05-01', content: 'Gây tê tại chỗ. Mở tủy răng 46, bơm rửa sạch hệ thống ống tủy và đặt thuốc diệt tủy Arsenic.', doctor: 'BS. Đức' },
      { id: 'n5', date: '2026-05-08', content: 'Tháo thuốc diệt tủy, sửa soạn ống tủy bằng trâm máy. Đo chiều dài làm việc ống tủy R46.', doctor: 'BS. Đức' },
      { id: 'n6', date: '2026-05-15', content: 'Trám bít ống tủy bằng Gutta Percha và nhựa trám AH Plus. Chụp X-quang kiểm tra bít khít chân răng.', doctor: 'BS. Đức' },
      { id: 'n7', date: '2026-05-25', content: 'Mài cùi răng R46, lấy dấu màng nhựa và lắp mão răng sứ Emax bảo vệ răng chết tủy.', doctor: 'BS. Đức' }
    ],
    timeline: [
      { stepNumber: 1, title: 'Mở tủy & Đặt thuốc diệt tủy', description: 'Lấy sạch sâu răng, mở buồng tủy và đặt thuốc diệt tủy.', daysInterval: 7, status: 'completed', actualCompletedDate: '2026-05-01', targetDate: '2026-05-01' },
      { stepNumber: 2, title: 'Sửa soạn ống tủy & Bơm rửa', description: 'Đo chiều dài làm việc, tạo hình ống tủy bằng trâm quay.', daysInterval: 7, status: 'completed', actualCompletedDate: '2026-05-08', targetDate: '2026-05-08' },
      { stepNumber: 3, title: 'Trám bít ống tủy (Gutta Percha)', description: 'Trám bít ống tủy bằng gutta-percha và sealant chuyên dụng.', daysInterval: 7, status: 'completed', actualCompletedDate: '2026-05-15', targetDate: '2026-05-15' },
      { stepNumber: 4, title: 'Bọc răng sứ bảo vệ (Phục hình)', description: 'Mài cùi răng, lấy dấu và bọc sứ để tránh nứt vỡ răng chết tủy.', daysInterval: 10, status: 'completed', actualCompletedDate: '2026-05-25', targetDate: '2026-05-25' }
    ]
  },
  {
    id: 'p4',
    name: 'Lê Văn Đạt',
    phone: '0933555777',
    dob: '1975-06-18',
    medicalHistory: 'Tiểu đường Type 2 kiểm soát tốt',
    treatmentType: 'periodontics',
    status: 'delayed',
    teethState: {
      17: 'has_issue',
      18: 'has_issue',
      27: 'has_issue',
      28: 'has_issue'
    },
    billing: {
      totalCost: 12000000,
      paidAmount: 4000000
    },
    clinicalNotes: [
      { id: 'n8', date: '2026-04-15', content: 'Tiến hành lấy cao răng mảng bám trên và dưới nướu. Nạo túi nha chu nông phần tư hàm 1 và 2 dưới gây tê bôi.', doctor: 'BS. Đức' }
    ],
    timeline: [
      { stepNumber: 1, title: 'Lấy cao răng & Nạo túi lợi nông', description: 'Làm sạch mảng bám, xử lý bề mặt gốc răng dưới nướu.', daysInterval: 14, status: 'completed', actualCompletedDate: '2026-04-15', targetDate: '2026-04-15' },
      { stepNumber: 2, title: 'Nạo túi nha chu sâu đợt 2', description: 'Làm sạch túi nha chu sâu dưới gây tê vùng.', daysInterval: 30, status: 'in_progress', targetDate: '2026-05-15' }, // Past targetDate, delayed!
      { stepNumber: 3, title: 'Đánh giá lại & Ghép mô liên kết', description: 'Kiểm tra độ sâu túi, tiến hành phẫu thuật ghép nướu nếu tụt lợi.', daysInterval: 45, status: 'pending', targetDate: '2026-06-29' }
    ]
  }
];

// --- MOCK CONSTANTS FOR AI INPUTS ---
const MOCK_AI_SCANS = [
  {
    id: 'scan_1',
    name: 'Bản quét Bệnh án số 1 (Chỉnh nha)',
    imageText: 'Ảnh chụp bệnh án viết tay của BS. Hùng tại bệnh viện tuyến tỉnh',
    rawContent: 'Bệnh nhân: Bùi Tiến Dũng, sinh ngày 15/08/1990. ĐT: 0977222333. Tiền sử lâm sàng: dị ứng kháng sinh Amoxicillin. Chỉ định điều trị: Chỉnh nha mắc cài kim loại hai hàm.',
    extractedData: {
      name: 'Bùi Tiến Dũng',
      phone: '0977222333',
      dob: '1990-08-15',
      medicalHistory: 'Dị ứng kháng sinh Amoxicillin',
      treatmentType: 'orthodontics'
    }
  },
  {
    id: 'scan_2',
    name: 'Bản quét Bệnh án số 2 (Cấy ghép Implant)',
    imageText: 'Ảnh chụp sổ khám răng miệng của bệnh nhân',
    rawContent: 'BN Vũ Hoài Anh, sinh năm 1997. SĐT: 0988444555. Mất răng số 36 lâu ngày cần cấy ghép implant, đề xuất ghép xương tự thân do tiêu xương ổ.',
    extractedData: {
      name: 'Vũ Hoài Anh',
      phone: '0988444555',
      dob: '1997-01-01',
      medicalHistory: 'Mất răng 36, tiêu xương ổ răng cần ghép xương',
      treatmentType: 'implant',
      targetTeeth: { 36: 'needs_implant' }
    }
  }
];

const MOCK_AI_VOICES = [
  {
    id: 'voice_1',
    transcript: 'Thêm bệnh nhân mới tên Phạm Ngọc Hải, sinh năm 1991, số điện thoại 0911777888, điều trị tủy.',
    description: 'Khẩu lệnh: Thêm mới bệnh nhân & tạo lộ trình điều trị tủy',
    actionType: 'add_patient',
    extractedData: {
      name: 'Phạm Ngọc Hải',
      phone: '0911777888',
      dob: '1991-01-01',
      medicalHistory: 'Viêm tủy cấp',
      treatmentType: 'root_canal'
    }
  },
  {
    id: 'voice_2',
    transcript: 'Cập nhật răng ba mươi sáu của bệnh nhân đang chọn bị sâu cần hàn composite.',
    description: 'Khẩu lệnh: Cập nhật răng 36 bị sâu của bệnh nhân đang hiển thị',
    actionType: 'update_tooth',
    extractedData: {
      tooth: 36,
      state: 'needs_fillings'
    }
  },
  {
    id: 'voice_3',
    transcript: 'Đánh dấu hoàn thành bước hiện tại cho bệnh nhân đang chọn.',
    description: 'Khẩu lệnh: Hoàn thành bước điều trị kế tiếp của bệnh nhân đang hiển thị',
    actionType: 'complete_step',
    extractedData: {
      // triggers complete on selected patient's active step
    }
  }
];

// Current date representation (June 3, 2026)
const CURRENT_SIMULATED_DATE = '2026-06-03';

export default function App() {
  // Database States
  const [patients, setPatients] = useState(() => {
    const localData = localStorage.getItem('df_patients');
    return localData ? JSON.parse(localData) : INITIAL_PATIENTS;
  });

  // Selected Patient State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || null);
  
  // App States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, delayed, on_track, completed
  const [treatmentFilter, setTreatmentFilter] = useState('all'); // all, orthodontics, implant, etc.
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [logs, setLogs] = useState([
    { time: '09:00:00', source: 'SERVER', text: 'Kết nối máy chủ cơ sở dữ liệu thành công.' },
    { time: '09:00:01', source: 'LOCAL', text: 'Khởi tạo cơ sở dữ liệu local WatermelonDB.' },
    { time: '09:00:02', source: 'SYNC', text: 'Đồng bộ hóa hoàn tất. Trùng khớp với phiên bản máy chủ 1.0.4.' }
  ]);

  // Selected Tooth State (For details overlay)
  const [selectedTooth, setSelectedTooth] = useState(null);
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    dob: '',
    medicalHistory: '',
    treatmentType: 'orthodontics'
  });

  // Timeline Step Modal
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false);
  const [newStep, setNewStep] = useState({
    title: '',
    description: '',
    daysInterval: 30
  });

  // AI Scan states
  const [isAiScanModalOpen, setIsAiScanModalOpen] = useState(false);
  const [selectedScanTemplateId, setSelectedScanTemplateId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // AI Voice states
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedVoiceTemplateId, setSelectedVoiceTemplateId] = useState('');
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);
  // Clinical Workflow States
  const [activeTab, setActiveTab] = useState('chart'); // history, chart, plan, notes, billing
  const [newClinicalNoteText, setNewClinicalNoteText] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [customNextAppointmentDate, setCustomNextAppointmentDate] = useState('');
  const logsEndRef = useRef(null);

  // Sync logs autoscroll
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Save to LocalStorage helper (simulates WatermelonDB local writes)
  const saveToLocalDB = (updatedPatients) => {
    localStorage.setItem('df_patients', JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
  };

  // Add a log helper
  const addLog = (source, text) => {
    const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    setLogs(prev => [...prev, { time, source, text }]);
  };

  // Simulate network changes
  const handleNetworkToggle = () => {
    const nextOnlineState = !isOnline;
    setIsOnline(nextOnlineState);
    
    if (nextOnlineState) {
      addLog('SYNC', 'Thiết bị trực tuyến trở lại. Đang xếp hàng xử lý đồng bộ...');
      if (pendingSyncCount > 0) {
        addLog('SYNC', `Phát hiện ${pendingSyncCount} thay đổi offline chưa đồng bộ. Đang đẩy lên Postgres Server...`);
        setTimeout(() => {
          addLog('SERVER', 'Máy chủ PostgreSQL đã chấp nhận và xử lý thành công các bản ghi mới.');
          addLog('SYNC', 'Cơ sở dữ liệu cục bộ và Máy chủ đồng bộ 100%.');
          setPendingSyncCount(0);
        }, 1500);
      }
    } else {
      addLog('SYNC', 'Thiết bị ngắt kết nối mạng. Ứng dụng tự động chuyển sang chế độ lưu trữ Offline.');
    }
  };

  // Synchronize action helper
  const triggerDatabaseWrite = (updatedPatients, changeDescription) => {
    saveToLocalDB(updatedPatients);
    addLog('LOCAL', `${changeDescription} đã được lưu offline vào WatermelonDB.`);
    
    if (isOnline) {
      addLog('SYNC', 'Đang gửi gói thay đổi lên Cloud Server...');
      setTimeout(() => {
        addLog('SERVER', `Đã đồng bộ hóa Postgres Server: ${changeDescription}`);
      }, 1000);
    } else {
      setPendingSyncCount(prev => prev + 1);
      addLog('SYNC', 'Mất mạng. Đã xếp hàng đợi đồng bộ sau.');
    }
  };

  // Calculate if patient timeline has deviation / delay
  const getPatientCalculatedStatus = (timeline) => {
    const allCompleted = timeline.every(step => step.status === 'completed');
    if (allCompleted) return 'completed';

    // Find any in_progress or pending steps that are overdue relative to CURRENT_SIMULATED_DATE (2026-06-03)
    const currentDate = new Date(CURRENT_SIMULATED_DATE);
    const hasDelayedStep = timeline.some(step => {
      if (step.status === 'completed') return false;
      const targetDate = new Date(step.targetDate);
      return targetDate < currentDate;
    });

    return hasDelayedStep ? 'delayed' : 'on_track';
  };

  // Add Patient Action
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone) return;

    // Load initial roadmap template
    const roadmapTemplate = CLINICAL_ROADMAPS[newPatient.treatmentType];
    let runningDate = new Date(CURRENT_SIMULATED_DATE);

    const timeline = roadmapTemplate.steps.map((step, idx) => {
      // Calculate projected targetDates
      if (idx > 0) {
        runningDate.setDate(runningDate.getDate() + step.daysInterval);
      }
      const targetDate = runningDate.toISOString().split('T')[0];
      return {
        ...step,
        status: idx === 0 ? 'in_progress' : 'pending',
        targetDate
      };
    });

    const newPatientObj = {
      id: `p_${Date.now()}`,
      name: newPatient.name,
      phone: newPatient.phone,
      dob: newPatient.dob || '1990-01-01',
      medicalHistory: newPatient.medicalHistory || 'Không có',
      treatmentType: newPatient.treatmentType,
      status: 'on_track',
      teethState: {},
      timeline
    };

    const updatedPatients = [...patients, newPatientObj];
    triggerDatabaseWrite(updatedPatients, `Thêm bệnh nhân mới: ${newPatient.name}`);
    
    setSelectedPatientId(newPatientObj.id);
    setIsAddModalOpen(false);
    setNewPatient({
      name: '',
      phone: '',
      dob: '',
      medicalHistory: '',
      treatmentType: 'orthodontics'
    });
  };

  // Handle AI Document Scan simulation
  const handleAiScan = (scanTemplateId) => {
    if (!scanTemplateId) return;
    const template = MOCK_AI_SCANS.find(s => s.id === scanTemplateId);
    if (!template) return;

    setIsScanning(true);
    setScanResult(null);
    addLog('LOCAL', `Khởi chạy camera. Đang chụp và tải tài liệu lên bộ lọc Gemini Vision...`);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult(template);
      addLog('SYNC', `Kết nối API AI Server thành công. Đang giải thích cấu trúc văn bản...`);
      setTimeout(() => {
        addLog('SERVER', `Đã trích xuất cấu trúc dữ liệu bệnh nhân từ bệnh án giấy: Bệnh nhân ${template.extractedData.name}`);
      }, 500);
    }, 1500);
  };

  const handleConfirmAiScan = () => {
    if (!scanResult) return;
    const data = scanResult.extractedData;
    
    // Load roadmap template
    const roadmapTemplate = CLINICAL_ROADMAPS[data.treatmentType];
    let runningDate = new Date(CURRENT_SIMULATED_DATE);

    const timeline = roadmapTemplate.steps.map((step, idx) => {
      if (idx > 0) {
        runningDate.setDate(runningDate.getDate() + step.daysInterval);
      }
      const targetDate = runningDate.toISOString().split('T')[0];
      return {
        ...step,
        status: idx === 0 ? 'in_progress' : 'pending',
        targetDate
      };
    });

    const newPatientObj = {
      id: `p_ai_${Date.now()}`,
      name: data.name,
      phone: data.phone,
      dob: data.dob,
      medicalHistory: data.medicalHistory,
      treatmentType: data.treatmentType,
      status: 'on_track',
      teethState: data.targetTeeth || {},
      timeline
    };

    const updatedPatients = [...patients, newPatientObj];
    triggerDatabaseWrite(updatedPatients, `Thêm bệnh nhân qua quét tài liệu AI: ${data.name}`);
    
    setSelectedPatientId(newPatientObj.id);
    setIsAiScanModalOpen(false);
    setScanResult(null);
    setSelectedScanTemplateId('');
  };

  // Handle AI Voice Command simulation
  const handleVoiceCommand = (voiceTemplateId) => {
    if (!voiceTemplateId) return;
    const template = MOCK_AI_VOICES.find(v => v.id === voiceTemplateId);
    if (!template) return;

    setIsVoiceProcessing(true);
    setVoiceResult(null);
    addLog('LOCAL', `Đang thu âm giọng nói của Bác sĩ: "${template.transcript}"`);

    setTimeout(() => {
      setIsVoiceProcessing(false);
      setVoiceResult(template);
      addLog('SYNC', `Đang tải tệp âm thanh lên mô hình Whisper Speech-to-Text & Gemini LLM...`);
      setTimeout(() => {
        addLog('SERVER', `Đã phân tích khẩu lệnh: ${template.description}`);
      }, 500);
    }, 1500);
  };

  const handleConfirmVoiceAction = () => {
    if (!voiceResult) return;
    const { actionType, extractedData } = voiceResult;

    if (actionType === 'add_patient') {
      // Add patient
      const roadmapTemplate = CLINICAL_ROADMAPS[extractedData.treatmentType];
      let runningDate = new Date(CURRENT_SIMULATED_DATE);

      const timeline = roadmapTemplate.steps.map((step, idx) => {
        if (idx > 0) {
          runningDate.setDate(runningDate.getDate() + step.daysInterval);
        }
        const targetDate = runningDate.toISOString().split('T')[0];
        return {
          ...step,
          status: idx === 0 ? 'in_progress' : 'pending',
          targetDate
        };
      });

      const newPatientObj = {
        id: `p_voice_${Date.now()}`,
        name: extractedData.name,
        phone: extractedData.phone,
        dob: extractedData.dob,
        medicalHistory: extractedData.medicalHistory,
        treatmentType: extractedData.treatmentType,
        status: 'on_track',
        teethState: {},
        timeline
      };

      const updatedPatients = [...patients, newPatientObj];
      triggerDatabaseWrite(updatedPatients, `Thêm bệnh nhân qua Giọng nói AI: ${extractedData.name}`);
      setSelectedPatientId(newPatientObj.id);

    } else if (actionType === 'update_tooth') {
      // Update tooth on currently selected patient
      const updatedPatients = patients.map(p => {
        if (p.id !== selectedPatientId) return p;
        const newTeethState = { ...p.teethState };
        newTeethState[extractedData.tooth] = extractedData.state;
        return { ...p, teethState: newTeethState };
      });
      const patient = patients.find(p => p.id === selectedPatientId);
      triggerDatabaseWrite(updatedPatients, `Cập nhật răng ${extractedData.tooth} bằng giọng nói cho BN ${patient.name}`);

    } else if (actionType === 'complete_step') {
      // Complete step on currently selected patient
      const patient = patients.find(p => p.id === selectedPatientId);
      if (patient) {
        const activeStep = patient.timeline.find(s => s.status !== 'completed');
        if (activeStep) {
          handleToggleStep(selectedPatientId, activeStep.stepNumber);
        }
      }
    }

    setIsVoiceModalOpen(false);
    setVoiceResult(null);
    setSelectedVoiceTemplateId('');
  };

  // Toggle step completion status
  const handleToggleStep = (patientId, stepNumber) => {
    const updatedPatients = patients.map(p => {
      if (p.id !== patientId) return p;

      const newTimeline = p.timeline.map((step, idx) => {
        if (step.stepNumber === stepNumber) {
          if (step.status !== 'completed') {
            // Complete it
            return {
              ...step,
              status: 'completed',
              actualCompletedDate: CURRENT_SIMULATED_DATE
            };
          } else {
            // Un-complete it
            return {
              ...step,
              status: 'in_progress',
              actualCompletedDate: undefined
            };
          }
        }
        
        // If we completed the step, trigger the next step to be 'in_progress' and shift dates
        if (stepNumber === idx && step.status !== 'completed') {
          // The next step (idx is stepNumber since 1-indexed matches array index)
          const prevCompletedDate = new Date(CURRENT_SIMULATED_DATE);
          const nextStepInterval = p.timeline[stepNumber]?.daysInterval || 30;
          prevCompletedDate.setDate(prevCompletedDate.getDate() + nextStepInterval);
          
          if (p.timeline[stepNumber]) {
            p.timeline[stepNumber].status = 'in_progress';
            p.timeline[stepNumber].targetDate = prevCompletedDate.toISOString().split('T')[0];
          }
        }

        return step;
      });

      // Recalculate dates for all subsequent steps based on completion of this step
      let runningDate = new Date(CURRENT_SIMULATED_DATE);
      const recalculatedTimeline = newTimeline.map((step, idx) => {
        if (step.status === 'completed') {
          return step;
        }
        // If preceding was completed, count from completion date
        if (idx > 0 && newTimeline[idx - 1].status === 'completed') {
          const compDate = new Date(newTimeline[idx - 1].actualCompletedDate);
          compDate.setDate(compDate.getDate() + step.daysInterval);
          return { ...step, targetDate: compDate.toISOString().split('T')[0] };
        }
        return step;
      });

      const nextStatus = getPatientCalculatedStatus(recalculatedTimeline);

      return {
        ...p,
        timeline: recalculatedTimeline,
        status: nextStatus
      };
    });

    const patient = patients.find(p => p.id === patientId);
    triggerDatabaseWrite(updatedPatients, `Cập nhật bước ${stepNumber} của BN ${patient.name}`);
  };

  // Add Custom Step to Selected Patient
  const handleAddCustomStep = (e) => {
    e.preventDefault();
    if (!newStep.title) return;

    const updatedPatients = patients.map(p => {
      if (p.id !== selectedPatientId) return p;

      const nextStepNum = p.timeline.length + 1;
      
      // Calculate target date based on last step
      const lastStep = p.timeline[p.timeline.length - 1];
      const baseDate = lastStep ? new Date(lastStep.targetDate) : new Date(CURRENT_SIMULATED_DATE);
      baseDate.setDate(baseDate.getDate() + parseInt(newStep.daysInterval));

      const stepObj = {
        stepNumber: nextStepNum,
        title: newStep.title,
        description: newStep.description || 'Không có mô tả',
        daysInterval: parseInt(newStep.daysInterval),
        status: 'pending',
        targetDate: baseDate.toISOString().split('T')[0]
      };

      const newTimeline = [...p.timeline, stepObj];
      const nextStatus = getPatientCalculatedStatus(newTimeline);

      return {
        ...p,
        timeline: newTimeline,
        status: nextStatus
      };
    });

    const patient = patients.find(p => p.id === selectedPatientId);
    triggerDatabaseWrite(updatedPatients, `Thêm bước khám tuỳ chỉnh cho BN ${patient.name}`);
    setIsAddStepModalOpen(false);
    setNewStep({ title: '', description: '', daysInterval: 30 });
  };

  // Update tooth state
  const handleUpdateToothState = (patientId, toothNum, nextState) => {
    const updatedPatients = patients.map(p => {
      if (p.id !== patientId) return p;
      
      const newTeethState = { ...p.teethState };
      if (nextState === 'healthy') {
        delete newTeethState[toothNum];
      } else {
        newTeethState[toothNum] = nextState;
      }

      return {
        ...p,
        teethState: newTeethState
      };
    });

    const patient = patients.find(p => p.id === patientId);
    triggerDatabaseWrite(updatedPatients, `Cập nhật tình trạng răng ${toothNum} của BN ${patient.name}`);
    setSelectedTooth(null);
  };

  // Add clinical note
  const handleAddClinicalNote = (e) => {
    e.preventDefault();
    if (!newClinicalNoteText.trim()) return;

    const updatedPatients = patients.map(p => {
      if (p.id !== selectedPatientId) return p;

      const newNote = {
        id: `n_${Date.now()}`,
        date: CURRENT_SIMULATED_DATE,
        content: newClinicalNoteText,
        doctor: 'BS. Đức'
      };

      return {
        ...p,
        clinicalNotes: [...(p.clinicalNotes || []), newNote]
      };
    });

    const patient = patients.find(p => p.id === selectedPatientId);
    triggerDatabaseWrite(updatedPatients, `Thêm nhật ký lâm sàng cho BN ${patient.name}`);
    setNewClinicalNoteText('');
  };

  // Make payment
  const handleMakePayment = (e) => {
    e.preventDefault();
    const amount = parseInt(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    const updatedPatients = patients.map(p => {
      if (p.id !== selectedPatientId) return p;

      const currentBilling = p.billing || { totalCost: 0, paidAmount: 0 };
      return {
        ...p,
        billing: {
          ...currentBilling,
          paidAmount: currentBilling.paidAmount + amount
        }
      };
    });

    const patient = patients.find(p => p.id === selectedPatientId);
    triggerDatabaseWrite(updatedPatients, `Thanh toán ${amount.toLocaleString('vi-VN')} VND cho BN ${patient.name}`);
    setPaymentAmount('');
  };

  // Update next appointment target date
  const handleSetNextAppointment = (e) => {
    e.preventDefault();
    if (!customNextAppointmentDate) return;

    const updatedPatients = patients.map(p => {
      if (p.id !== selectedPatientId) return p;

      // Find the active step (first step that is not completed)
      const activeStepIndex = p.timeline.findIndex(s => s.status !== 'completed');
      if (activeStepIndex === -1) return p;

      const newTimeline = p.timeline.map((step, idx) => {
        if (idx === activeStepIndex) {
          return {
            ...step,
            targetDate: customNextAppointmentDate
          };
        }
        return step;
      });

      // Recalculate subsequent steps based on this new target date
      const recalculatedTimeline = newTimeline.map((step, idx) => {
        if (idx <= activeStepIndex) return step;
        
        // Count forward from the new target date of the active step
        const prevTargetDate = new Date(newTimeline[idx - 1].targetDate);
        prevTargetDate.setDate(prevTargetDate.getDate() + step.daysInterval);
        return {
          ...step,
          targetDate: prevTargetDate.toISOString().split('T')[0]
        };
      });

      const nextStatus = getPatientCalculatedStatus(recalculatedTimeline);

      return {
        ...p,
        timeline: recalculatedTimeline,
        status: nextStatus
      };
    });

    const patient = patients.find(p => p.id === selectedPatientId);
    triggerDatabaseWrite(updatedPatients, `Đặt lịch hẹn tái khám tiếp theo vào ngày ${customNextAppointmentDate} cho BN ${patient.name}`);
    setCustomNextAppointmentDate('');
  };

  // Reset database to initial mock
  const handleResetData = () => {
    if(window.confirm('Bác sĩ có chắc chắn muốn khôi phục dữ liệu ban đầu không? Toàn bộ các thay đổi sẽ bị xoá.')) {
      localStorage.removeItem('df_patients');
      setPatients(INITIAL_PATIENTS);
      setSelectedPatientId(INITIAL_PATIENTS[0].id);
      setLogs([
        { time: '09:00:00', source: 'SERVER', text: 'Kết nối máy chủ cơ sở dữ liệu thành công.' },
        { time: '09:00:01', source: 'LOCAL', text: 'Khôi phục cơ sở dữ liệu gốc thành công.' }
      ]);
      setPendingSyncCount(0);
    }
  };

  // Filter and Search Patients
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesTreatment = treatmentFilter === 'all' || p.treatmentType === treatmentFilter;
    
    return matchesSearch && matchesStatus && matchesTreatment;
  });

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Statistics Computations
  const totalPatientsCount = patients.length;
  const delayedCount = patients.filter(p => p.status === 'delayed').length;
  const onTrackCount = patients.filter(p => p.status === 'on_track').length;
  const completedCount = patients.filter(p => p.status === 'completed').length;
  const complianceRate = totalPatientsCount > 0 
    ? Math.round(((onTrackCount + completedCount) / totalPatientsCount) * 100) 
    : 100;

  // FDI Tooth List Helpers
  const upperRightTeeth = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeftTeeth = [21, 22, 23, 24, 25, 26, 27, 28];
  const lowerRightTeeth = [48, 47, 46, 45, 44, 43, 42, 41];
  const lowerLeftTeeth = [31, 32, 33, 34, 35, 36, 37, 38];

  // Calculate delay days for display
  const getDelayDays = (patient) => {
    if (patient.status !== 'delayed') return 0;
    const dates = patient.timeline
      .filter(step => step.status !== 'completed')
      .map(step => new Date(step.targetDate));
    
    if (dates.length === 0) return 0;
    const earliestTarget = new Date(Math.min(...dates));
    const currentDate = new Date(CURRENT_SIMULATED_DATE);
    const diffTime = Math.abs(currentDate - earliestTarget);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">DF</div>
          <div className="logo-text">
            <h1>DentalFlow</h1>
            <p>Phần mềm Nha khoa Offline-First</p>
          </div>
        </div>

        <nav className="nav-menu">
          <button className="nav-item active">
            <Users size={18} />
            <span>Quản lý bệnh nhân</span>
          </button>
          <button className="nav-item" onClick={() => addLog('LOCAL', 'Mở lịch hẹn (tính năng đang phát triển ở Phase 2)')}>
            <Calendar size={18} />
            <span>Lịch trình & Đặt hẹn</span>
          </button>
          <button className="nav-item" onClick={() => addLog('LOCAL', 'Mở báo cáo doanh thu (tính năng đang phát triển ở Phase 3)')}>
            <Activity size={18} />
            <span>Thống kê & Tài chính</span>
          </button>
          <button className="nav-item" onClick={handleResetData}>
            <RefreshCw size={18} />
            <span>Reset Dữ liệu Mẫu</span>
          </button>
        </nav>

        {/* Sync Status Panel */}
        <div className="sync-panel">
          <div className="sync-header">
            <span className="sync-title">Trạng thái Cơ sở dữ liệu</span>
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
          </div>
          
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Mạng Internet:</span>
              <span style={{ color: isOnline ? '#10b981' : '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Lưu trữ Local:</span>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>WatermelonDB</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Lưu trữ Server:</span>
              <span>PostgreSQL</span>
            </div>

            {pendingSyncCount > 0 && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '6px', borderRadius: '4px', fontSize: '11px', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '4px' }}>
                {pendingSyncCount} tác vụ đang đợi đồng bộ lên server.
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>Tắt/Bật mạng (Sim):</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={isOnline} onChange={handleNetworkToggle} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '22px' }}>Bảng điều khiển lâm sàng</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Mô phỏng ngày hôm nay: <strong>03 tháng 06, 2026</strong></p>
          </div>
          
          <div className="user-profile">
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '600', fontSize: '14px' }}>BS. Nguyễn Minh Đức</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Chuyên khoa Chỉnh nha & Implant</p>
            </div>
            <div className="avatar">MĐ</div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          
          {/* STATS BAR */}
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: 'var(--primary)' }}>
                <Users size={24} />
              </div>
              <div className="metric-info">
                <h3>Tổng số bệnh nhân</h3>
                <p>{totalPatientsCount}</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'var(--status-healthy-glow)', color: 'var(--status-healthy)' }}>
                <CheckCircle size={24} />
              </div>
              <div className="metric-info">
                <h3>Tỷ lệ Tuân thủ Lộ trình</h3>
                <p>{complianceRate}%</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'var(--status-danger-glow)', color: 'var(--status-danger)' }}>
                <ShieldAlert size={24} />
              </div>
              <div className="metric-info">
                <h3>Bệnh nhân trễ hẹn (Cảnh báo)</h3>
                <p style={{ color: 'var(--status-danger)' }}>{delayedCount}</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'var(--status-active-glow)', color: 'var(--status-active)' }}>
                <Clock size={24} />
              </div>
              <div className="metric-info">
                <h3>Đúng lộ trình điều trị</h3>
                <p style={{ color: 'var(--status-active)' }}>{onTrackCount}</p>
              </div>
            </div>
          </div>

          {/* MAIN SPLIT VIEW */}
          <div className="split-view">
            
            {/* LEFT COLUMN: PATIENT LIST */}
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Danh sách Bệnh nhân</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(0, 242, 254, 0.1)', color: 'var(--primary)', border: '1px solid rgba(0, 242, 254, 0.2)' }} onClick={() => setIsAiScanModalOpen(true)}>
                    <Camera size={14} /> AI Scan
                  </button>
                  <button type="button" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={14} /> Thêm mới
                  </button>
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="search-container" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="search-input-wrapper" style={{ flexGrow: 1 }}>
                  <Search className="search-icon" size={16} />
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Tìm tên hoặc số điện thoại..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-secondary" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.2)' }} title="Nhập liệu bằng giọng nói AI" onClick={() => setIsVoiceModalOpen(true)}>
                  <Mic size={16} />
                </button>
              </div>

              {/* SPECIALTY FILTER */}
              <div style={{ padding: '0 20px 12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Chuyên khoa:</span>
                <select 
                  className="input" 
                  style={{ flexGrow: 1, padding: '6px 10px', fontSize: '12px', backgroundColor: '#151d30', color: 'white', border: '1px solid var(--border)' }}
                  value={treatmentFilter}
                  onChange={(e) => setTreatmentFilter(e.target.value)}
                >
                  <option value="all">Tất cả chuyên khoa</option>
                  <option value="orthodontics">Chỉnh nha (Niềng răng)</option>
                  <option value="implant">Cấy ghép Implant</option>
                  <option value="root_canal">Điều trị tủy (Nội nha)</option>
                  <option value="periodontics">Điều trị Nha chu</option>
                  <option value="general">Hàn răng & Tổng quát</option>
                </select>
              </div>

              {/* FILTERS */}
              <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '6px', overflowX: 'auto', backgroundColor: '#0d1525' }}>
                <button className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '15px' }} onClick={() => setStatusFilter('all')}>Tất cả</button>
                <button className={`btn ${statusFilter === 'delayed' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '15px' }} onClick={() => setStatusFilter('delayed')}>Trễ hẹn ({delayedCount})</button>
                <button className={`btn ${statusFilter === 'on_track' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '15px' }} onClick={() => setStatusFilter('on_track')}>Đúng hạn ({onTrackCount})</button>
                <button className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '15px' }} onClick={() => setStatusFilter('completed')}>Hoàn thành ({completedCount})</button>
              </div>

              {/* PATIENT ROWS */}
              <div className="patient-list">
                {filteredPatients.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlignment: 'center', color: 'var(--text-dimmed)', fontSize: '14px', textAlign: 'center' }}>
                    Không tìm thấy bệnh nhân phù hợp.
                  </div>
                ) : (
                  filteredPatients.map(p => {
                    const delayDays = getDelayDays(p);
                    return (
                      <div 
                        key={p.id} 
                        className={`patient-item ${selectedPatientId === p.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPatientId(p.id)}
                      >
                        <div className="patient-row-top">
                          <span className="patient-name">{p.name}</span>
                          {p.status === 'delayed' && (
                            <span className="badge badge-red">Trễ {delayDays} ngày</span>
                          )}
                          {p.status === 'on_track' && (
                            <span className="badge badge-yellow">Đúng hạn</span>
                          )}
                          {p.status === 'completed' && (
                            <span className="badge badge-green">Hoàn thành</span>
                          )}
                        </div>
                        <div className="patient-meta">
                          <span>SĐT: {p.phone}</span>
                          <span>Chuyên khoa: {CLINICAL_ROADMAPS[p.treatmentType]?.name.split(' (')[0]}</span>
                        </div>
                        {p.teethState && Object.keys(p.teethState).length > 0 && (
                          <div className="patient-badges" style={{ marginTop: '4px' }}>
                            {Object.entries(p.teethState).map(([tooth, state]) => {
                              let tagColor = '#94a3b8';
                              let stateName = '';
                              if (state === 'needs_fillings') { stateName = 'Sâu răng'; tagColor = '#fbbf24'; }
                              if (state === 'has_issue') { stateName = 'Hỏng tủy'; tagColor = '#f87171'; }
                              if (state === 'needs_implant') { stateName = 'Mất răng'; tagColor = '#ef4444'; }
                              if (state === 'completed') { stateName = 'Đã chữa'; tagColor = '#34d399'; }
                              return (
                                <span key={tooth} style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${tagColor}40`, color: tagColor, padding: '1px 6px', borderRadius: '4px' }}>
                                  R{tooth}: {stateName}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: PATIENT PROFILE & TIMELINE & DENTAL CHART */}
            {selectedPatient ? (
              <div className="patient-detail-grid">
                
                {/* PROFILE HEADER CARD */}
                <div className="profile-card">
                  <div className="profile-info">
                    <div className="profile-header-name">
                      <span>{selectedPatient.name}</span>
                      {selectedPatient.status === 'delayed' ? (
                        <span className="badge badge-red" style={{ fontSize: '12px' }}>Cảnh báo: Trễ lộ trình hẹn khám</span>
                      ) : selectedPatient.status === 'completed' ? (
                        <span className="badge badge-green" style={{ fontSize: '12px' }}>Đã kết thúc lộ trình điều trị</span>
                      ) : (
                        <span className="badge badge-yellow" style={{ fontSize: '12px' }}>Tiến độ bình thường</span>
                      )}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      <p><strong>Ngày sinh:</strong> {new Date(selectedPatient.dob).toLocaleDateString('vi-VN')}</p>
                      <p><strong>Số điện thoại:</strong> {selectedPatient.phone}</p>
                      <p><strong>Loại dịch vụ:</strong> <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{CLINICAL_ROADMAPS[selectedPatient.treatmentType]?.name}</span></p>
                      <p><strong>Tiền sử bệnh lý:</strong> <span style={{ color: '#ef4444' }}>{selectedPatient.medicalHistory}</span></p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mã bệnh án</div>
                    <code style={{ fontSize: '14px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }}>{selectedPatient.id.toUpperCase()}</code>
                  </div>
                </div>

                {/* FLOWBAR: DENTAL CLINIC CLINICAL WORKFLOW */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-card)', overflow: 'hidden' }}>
                  {[
                    { id: 'history', label: '1. Đón tiếp & Tiền sử', icon: <Users size={14} /> },
                    { id: 'chart', label: '2. Khám răng lâm sàng', icon: <Activity size={14} /> },
                    { id: 'plan', label: '3. Phác đồ & Lộ trình', icon: <Calendar size={14} /> },
                    { id: 'notes', label: '4. Nhật ký lâm sàng', icon: <FileText size={14} /> },
                    { id: 'billing', label: '5. Thanh toán & Hẹn lịch', icon: <Clock size={14} /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '12px 8px',
                        fontSize: '11px',
                        borderRadius: 0,
                        backgroundColor: activeTab === tab.id ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                        borderRight: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      <span style={{ fontWeight: activeTab === tab.id ? '700' : '500' }}>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* CONDITIONAL TAB RENDERING */}
                {activeTab === 'history' && (
                  <div className="panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      Thông tin Hành chính & Tiền sử Y khoa
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <span className="form-label">Họ và tên bệnh nhân:</span>
                        <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          {selectedPatient.name}
                        </div>
                      </div>
                      <div className="form-group">
                        <span className="form-label">Số điện thoại liên hệ:</span>
                        <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          {selectedPatient.phone}
                        </div>
                      </div>
                      <div className="form-group">
                        <span className="form-label">Ngày sinh:</span>
                        <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          {new Date(selectedPatient.dob).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <div className="form-group">
                        <span className="form-label">Chuyên khoa điều trị chính:</span>
                        <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                          {CLINICAL_ROADMAPS[selectedPatient.treatmentType]?.name}
                        </div>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '8px' }}>
                      <span className="form-label" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertTriangle size={14} /> Tiền sử y khoa / Cảnh báo lâm sàng:
                      </span>
                      <textarea
                        className="input"
                        rows="3"
                        style={{ resize: 'none', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}
                        value={selectedPatient.medicalHistory}
                        onChange={(e) => {
                          const updated = patients.map(p => {
                            if (p.id === selectedPatient.id) {
                              return { ...p, medicalHistory: e.target.value };
                            }
                            return p;
                          });
                          triggerDatabaseWrite(updated, `Cập nhật tiền sử bệnh của BN ${selectedPatient.name}`);
                        }}
                      />
                      <p style={{ fontSize: '11px', color: 'var(--text-dimmed)' }}>Ghi chú các dị ứng thuốc (Amoxicillin, tê...), các bệnh lý nền (tiểu đường, tim mạch, máu khó đông...) cần đặc biệt lưu ý trước khi phẫu thuật/điều trị.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'chart' && (
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Sơ đồ răng bệnh lý (FDI System)
                        <span style={{ fontSize: '12px', color: 'var(--text-dimmed)', fontWeight: 'normal' }}>(Chọn răng để cập nhật tình trạng khám lâm sàng)</span>
                      </span>
                    </div>

                    <div className="dental-chart-container">
                      <div className="chart-grid">
                        {/* JAW ROW UPPER */}
                        <div className="jaw-row">
                          {upperRightTeeth.map(num => {
                            const state = selectedPatient.teethState[num];
                            return (
                              <div className="tooth-item" key={num}>
                                <button 
                                  className={`tooth-button ${selectedTooth === num ? 'selected' : ''} ${state || ''}`}
                                  onClick={() => setSelectedTooth(selectedTooth === num ? null : num)}
                                >
                                  {num}
                                </button>
                              </div>
                            );
                          })}
                          <div style={{ width: '2px', backgroundColor: 'var(--border)', margin: '0 8px' }}></div>
                          {upperLeftTeeth.map(num => {
                            const state = selectedPatient.teethState[num];
                            return (
                              <div className="tooth-item" key={num}>
                                <button 
                                  className={`tooth-button ${selectedTooth === num ? 'selected' : ''} ${state || ''}`}
                                  onClick={() => setSelectedTooth(selectedTooth === num ? null : num)}
                                >
                                  {num}
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* JAW ROW LOWER */}
                        <div className="jaw-row">
                          {lowerRightTeeth.map(num => {
                            const state = selectedPatient.teethState[num];
                            return (
                              <div className="tooth-item" key={num}>
                                <button 
                                  className={`tooth-button ${selectedTooth === num ? 'selected' : ''} ${state || ''}`}
                                  onClick={() => setSelectedTooth(selectedTooth === num ? null : num)}
                                >
                                  {num}
                                </button>
                              </div>
                            );
                          })}
                          <div style={{ width: '2px', backgroundColor: 'var(--border)', margin: '0 8px' }}></div>
                          {lowerLeftTeeth.map(num => {
                            const state = selectedPatient.teethState[num];
                            return (
                              <div className="tooth-item" key={num}>
                                <button 
                                  className={`tooth-button ${selectedTooth === num ? 'selected' : ''} ${state || ''}`}
                                  onClick={() => setSelectedTooth(selectedTooth === num ? null : num)}
                                >
                                  {num}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {selectedTooth && (
                        <div style={{ marginTop: '12px', padding: '16px', backgroundColor: '#0d1525', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '15px' }}>Cập nhật tình trạng răng số {selectedTooth}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tình trạng hiện tại: <strong>{selectedPatient.teethState[selectedTooth] ? (
                              selectedPatient.teethState[selectedTooth] === 'needs_fillings' ? 'Sâu răng (Cần hàn)' :
                              selectedPatient.teethState[selectedTooth] === 'has_issue' ? 'Viêm tủy (Cần diệt tủy)' :
                              selectedPatient.teethState[selectedTooth] === 'needs_implant' ? 'Mất răng (Cần Implant)' :
                              'Đã hoàn thành điều trị'
                            ) : 'Răng khoẻ mạnh bình thường'}</strong></p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#10b981' }} onClick={() => handleUpdateToothState(selectedPatient.id, selectedTooth, 'healthy')}>Khoẻ mạnh</button>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#fbbf24' }} onClick={() => handleUpdateToothState(selectedPatient.id, selectedTooth, 'needs_fillings')}>Sâu răng (Hàn)</button>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#f87171' }} onClick={() => handleUpdateToothState(selectedPatient.id, selectedTooth, 'has_issue')}>Viêm tủy (Tủy)</button>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#ef4444' }} onClick={() => handleUpdateToothState(selectedPatient.id, selectedTooth, 'needs_implant')}>Mất răng (Implant)</button>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#34d399' }} onClick={() => handleUpdateToothState(selectedPatient.id, selectedTooth, 'completed')}>Đã điều trị</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'plan' && (
                  <div className="panel timeline-section">
                    <div className="panel-header" style={{ borderBottom: 'none', padding: 0 }}>
                      <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Lộ trình Phác đồ Điều trị Chi tiết
                        <span style={{ fontSize: '12px', color: 'var(--text-dimmed)', fontWeight: 'normal' }}> (Bấm dấu tick để hoàn thành bước điều trị lâm sàng)</span>
                      </span>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsAddStepModalOpen(true)}>
                        <Plus size={14} /> Thêm Bước Tuỳ Chỉnh
                      </button>
                    </div>

                    <div className="timeline-flow">
                      {selectedPatient.timeline.map(step => {
                        const isStepOverdue = step.status !== 'completed' && new Date(step.targetDate) < new Date(CURRENT_SIMULATED_DATE);
                        
                        return (
                          <div className="timeline-step" key={step.stepNumber}>
                            <div className={`timeline-node ${step.status}`}>
                              {step.status === 'completed' ? <Check size={12} /> : <span>{step.stepNumber}</span>}
                            </div>
                            
                            <div className="timeline-step-content" style={{
                              borderLeftStyle: 'solid',
                              borderLeftWidth: step.status === 'completed' || step.status === 'in_progress' ? '3px' : '1px',
                              borderLeftColor: isStepOverdue ? 'var(--status-danger)' : (
                                step.status === 'completed' ? 'var(--status-healthy)' : 
                                step.status === 'in_progress' ? 'var(--status-active)' : 
                                'var(--border)'
                              ),
                              borderTopColor: isStepOverdue ? 'var(--status-danger)' : '',
                              borderRightColor: isStepOverdue ? 'var(--status-danger)' : '',
                              borderBottomColor: isStepOverdue ? 'var(--status-danger)' : ''
                            }}>
                              <div className="timeline-step-header">
                                <span className="timeline-step-title" style={{
                                  color: step.status === 'completed' ? 'var(--text-muted)' : 'var(--text-main)',
                                  textDecoration: step.status === 'completed' ? 'line-through' : 'none'
                                }}>
                                  {step.title}
                                </span>
                                
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                  {isStepOverdue && (
                                    <span className="badge badge-red" style={{ fontSize: '10px' }}>Trễ hẹn khám</span>
                                  )}
                                  
                                  <button 
                                    className={`btn ${step.status === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', display: 'flex', gap: '4px', alignItems: 'center' }}
                                    onClick={() => handleToggleStep(selectedPatient.id, step.stepNumber)}
                                  >
                                    {step.status === 'completed' ? 'Đã xong' : 'Đánh dấu xong'}
                                  </button>
                                </div>
                              </div>

                              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                {step.description}
                              </p>

                              <div className="timeline-step-meta">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock size={12} /> Lịch giãn cách: {step.daysInterval} ngày
                                </span>
                                
                                <span>
                                  <strong>Ngày dự kiến:</strong> {new Date(step.targetDate).toLocaleDateString('vi-VN')}
                                </span>

                                {step.actualCompletedDate && (
                                  <span style={{ color: 'var(--status-healthy)' }}>
                                    <strong>Đã khám vào:</strong> {new Date(step.actualCompletedDate).toLocaleDateString('vi-VN')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700' }}>
                        Nhật ký Lâm sàng (Sổ theo dõi ghế nha)
                      </h3>
                      <span style={{ fontSize: '12px', color: 'var(--text-dimmed)' }}>Ghi chép chi tiết mỗi lần điều trị thực tế</span>
                    </div>

                    {/* NEW NOTE FORM */}
                    <form onSubmit={handleAddClinicalNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      <span className="form-label" style={{ fontWeight: 'bold' }}>Thêm nhật ký buổi khám hôm nay:</span>
                      <textarea
                        className="input"
                        rows="3"
                        placeholder="Ví dụ: Bệnh nhân đến thay thun chuỗi kéo đóng khoảng... Vệ sinh răng miệng chưa tốt, hướng dẫn sử dụng chỉ nha khoa..."
                        required
                        value={newClinicalNoteText}
                        onChange={(e) => setNewClinicalNoteText(e.target.value)}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-dimmed)' }}>Người ghi: <strong>BS. Nguyễn Minh Đức</strong></span>
                        <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                          <Check size={14} /> Ghi nhận buổi khám
                        </button>
                      </div>
                    </form>

                    {/* LIST OF PAST NOTES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                      {(!selectedPatient.clinicalNotes || selectedPatient.clinicalNotes.length === 0) ? (
                        <p style={{ fontStyle: 'italic', color: 'var(--text-dimmed)', textAlign: 'center', padding: '20px' }}>Chưa có ghi chép nhật ký lâm sàng nào.</p>
                      ) : (
                        selectedPatient.clinicalNotes.slice().reverse().map(note => (
                          <div key={note.id} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                              <strong>{new Date(note.date).toLocaleDateString('vi-VN')}</strong>
                              <span>Người thực hiện: <strong>{note.doctor}</strong></span>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>{note.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* FINANCIAL SUMMARY */}
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px' }}>
                        Chi phí Điều trị & Tài chính (Phòng khám nhỏ)
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tổng chi phí phác đồ</span>
                          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginTop: '4px' }}>
                            {((selectedPatient.billing?.totalCost) || 0).toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--status-healthy)' }}>Đã thanh toán</span>
                          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--status-healthy)', marginTop: '4px' }}>
                            {((selectedPatient.billing?.paidAmount) || 0).toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#f87171' }}>Còn lại cần thu</span>
                          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171', marginTop: '4px' }}>
                            {(((selectedPatient.billing?.totalCost) || 0) - ((selectedPatient.billing?.paidAmount) || 0)).toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTION: MAKE PAYMENT */}
                    <form onSubmit={handleMakePayment} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span className="form-label" style={{ fontWeight: 'bold' }}>Thu tiền đợt điều trị hôm nay:</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative', flexGrow: 1 }}>
                          <input
                            type="number"
                            className="input"
                            style={{ width: '100%', paddingRight: '40px' }}
                            placeholder="Ví dụ: 2000000"
                            required
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dimmed)', fontSize: '13px' }}>VND</span>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                          Xác nhận Thu tiền
                        </button>
                      </div>
                    </form>

                    {/* ACTION: APPOINTMENT SCHEDULER */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                      <h4 style={{ fontWeight: '600', fontSize: '15px', marginBottom: '12px' }}>Lên lịch Hẹn khám lần tiếp theo (Tránh trễ hẹn kéo dài)</h4>
                      
                      <form onSubmit={handleSetNextAppointment} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flexGrow: 1 }}>
                          <label className="form-label">Chọn ngày tái khám:</label>
                          <input
                            type="date"
                            className="input"
                            style={{ width: '100%' }}
                            required
                            value={customNextAppointmentDate}
                            onChange={(e) => setCustomNextAppointmentDate(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-secondary" style={{ height: '42px', padding: '0 20px', border: '1px solid var(--border)' }}>
                          Cập nhật Lịch Hẹn
                        </button>
                      </form>
                      <p style={{ fontSize: '11px', color: 'var(--text-dimmed)', marginTop: '6px' }}>Khi thay đổi ngày tái khám này, hệ thống sẽ tự động cập nhật thời hạn bước điều trị hiện tại và tính toán lại lịch dự kiến cho các bước tiếp theo.</p>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', border: '1px dashed var(--border)', borderRadius: '16px', color: 'var(--text-muted)' }}>
                Vui lòng chọn một bệnh nhân để xem chi tiết bệnh án và lộ trình điều trị.
              </div>
            )}

          </div>

        </div>

        {/* MOCK LOGS MONITOR (CONSOLE) */}
        <footer className="console-panel">
          <div className="console-header">
            <div className="console-title">
              <Database size={14} />
              <span>NHẬT KÝ ĐỒNG BỘ OFFLINE-FIRST (DATABASE SYSTEM LOGS)</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-dimmed)' }}>
              Đồng bộ tự động sử dụng giao thức WatermelonDB Sync Protocol
            </div>
          </div>
          
          <div className="console-logs">
            {logs.map((log, idx) => (
              <div className="log-entry" key={idx}>
                <span className="log-time">[{log.time}]</span>
                <span className={`log-tag ${log.source.toLowerCase()}`}>
                  [{log.source}]
                </span>
                <span className="log-text">{log.text}</span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </footer>
      </main>

      {/* MODAL: ADD PATIENT */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleAddPatient}>
            <div className="modal-header">
              <span className="modal-title">Thêm Bệnh nhân Mới & Tạo Lộ trình</span>
              <button type="button" className="close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Tên bệnh nhân *</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Ví dụ: Nguyễn Văn Trỗi" 
                required
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input 
                  type="tel" 
                  className="input" 
                  placeholder="09..." 
                  required
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ngày sinh</label>
                <input 
                  type="date" 
                  className="input" 
                  value={newPatient.dob}
                  onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Chuyên khoa điều trị (Hệ thống tự động tạo phác đồ)</label>
              <select 
                className="input"
                style={{ backgroundColor: '#151d30', color: 'white' }}
                value={newPatient.treatmentType}
                onChange={(e) => setNewPatient({ ...newPatient, treatmentType: e.target.value })}
              >
                <option value="orthodontics">Chỉnh nha (Niềng răng)</option>
                <option value="implant">Cấy ghép Implant</option>
                <option value="root_canal">Điều trị tủy (Nội nha)</option>
                <option value="periodontics">Điều trị Nha chu</option>
                <option value="general">Hàn răng & Vệ sinh Tổng quát</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tiền sử y khoa đặc biệt (nếu có)</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Ví dụ: Dị ứng Penicillin, Huyết áp cao..." 
                value={newPatient.medicalHistory}
                onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
              <button type="submit" className="btn btn-primary">Tạo Hồ sơ & Lộ trình</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ADD CUSTOM STEP */}
      {isAddStepModalOpen && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleAddCustomStep}>
            <div className="modal-header">
              <span className="modal-title">Thêm bước điều trị tùy chỉnh</span>
              <button type="button" className="close-btn" onClick={() => setIsAddStepModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Tên bước điều trị *</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Ví dụ: Đeo hàm duy trì đợt 2" 
                required
                value={newStep.title}
                onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mô tả chi tiết kỹ thuật</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Mô tả khí cụ sử dụng, chỉ dẫn cho phụ tá..." 
                value={newStep.description}
                onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Thời gian giãn cách kể từ bước trước (Số ngày)</label>
              <input 
                type="number" 
                className="input" 
                min="1"
                required
                value={newStep.daysInterval}
                onChange={(e) => setNewStep({ ...newStep, daysInterval: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsAddStepModalOpen(false)}>Hủy</button>
              <button type="submit" className="btn btn-primary">Thêm vào Lộ trình</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: AI DOCUMENT SCAN */}
      {isAiScanModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <span className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={20} style={{ color: 'var(--primary)' }} />
                AI Paper Scan (Gemini Vision OCR)
              </span>
              <button type="button" className="close-btn" onClick={() => { setIsAiScanModalOpen(false); setScanResult(null); setSelectedScanTemplateId(''); }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <p>Mô phỏng máy ảnh chụp lại bệnh án giấy của phòng khám. Trong ứng dụng iOS thực tế, Bác sĩ chỉ cần đưa camera iPhone/iPad lên chụp để AI tự động chuyển hóa thành hồ sơ số cấu trúc.</p>
            </div>

            <div className="form-group">
              <label className="form-label">Chọn ảnh chụp bệnh án giấy mẫu:</label>
              <select 
                className="input" 
                style={{ backgroundColor: '#151d30', color: 'white' }}
                value={selectedScanTemplateId}
                onChange={(e) => setSelectedScanTemplateId(e.target.value)}
              >
                <option value="">-- Chọn ảnh chụp bệnh án --</option>
                {MOCK_AI_SCANS.map(scan => (
                  <option key={scan.id} value={scan.id}>{scan.name}</option>
                ))}
              </select>
            </div>

            {selectedScanTemplateId && !isScanning && !scanResult && (
              <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border)', borderRadius: '8px', fontSize: '12px' }}>
                <p><strong>Mô tả ảnh:</strong> {MOCK_AI_SCANS.find(s => s.id === selectedScanTemplateId)?.imageText}</p>
                <p style={{ marginTop: '6px', color: 'var(--text-dimmed)', fontStyle: 'italic' }}>"{MOCK_AI_SCANS.find(s => s.id === selectedScanTemplateId)?.rawContent}"</p>
              </div>
            )}

            {selectedScanTemplateId && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  disabled={isScanning}
                  onClick={() => handleAiScan(selectedScanTemplateId)}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      Gemini đang quét ảnh...
                    </>
                  ) : 'Bắt đầu quét bằng AI'}
                </button>
              </div>
            )}

            {/* SCANNING LOADING COMPONENT */}
            {isScanning && (
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--primary)', animation: 'spin 2s linear infinite' }} />
                <p style={{ fontSize: '14px', fontWeight: '600' }}>Đang nhận diện chữ viết tay & cấu trúc hóa dữ liệu...</p>
                <p style={{ fontSize: '11px', color: 'var(--text-dimmed)' }}>API: gemini-3.5-flash (OCR & Entity Extraction Mode)</p>
              </div>
            )}

            {/* SCAN RESULT PANEL */}
            {scanResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--status-healthy)', fontWeight: 'bold', fontSize: '14px' }}>
                  <CheckCircle size={16} />
                  <span>Trích xuất cấu trúc thành công!</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Tên bệnh nhân:</strong> <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{scanResult.extractedData.name}</span></div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Số điện thoại:</strong> <span>{scanResult.extractedData.phone}</span></div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Ngày sinh:</strong> <span>{new Date(scanResult.extractedData.dob).toLocaleDateString('vi-VN')}</span></div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Tiền sử y khoa:</strong> <span style={{ color: '#f87171' }}>{scanResult.extractedData.medicalHistory}</span></div>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Phác đồ mẫu đề xuất:</strong>{' '}
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                      {CLINICAL_ROADMAPS[scanResult.extractedData.treatmentType]?.name}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setScanResult(null)}>Quét lại</button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirmAiScan}>Xác nhận & Tạo bệnh án</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: AI VOICE COMMAND */}
      {isVoiceModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <span className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mic size={20} style={{ color: '#a5b4fc' }} />
                Nhập liệu bằng Giọng nói AI (STT & NLP)
              </span>
              <button type="button" className="close-btn" onClick={() => { setIsVoiceModalOpen(false); setVoiceResult(null); setSelectedVoiceTemplateId(''); }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <p>Mô phỏng tính năng rảnh tay dành cho Bác sĩ khi đang điều trị lâm sàng. Bác sĩ chỉ cần bấm nút tai nghe hoặc màn hình iPad và đọc y lệnh trực tiếp.</p>
            </div>

            <div className="form-group">
              <label className="form-label">Chọn khẩu lệnh giọng nói mẫu của Bác sĩ:</label>
              <select 
                className="input" 
                style={{ backgroundColor: '#151d30', color: 'white' }}
                value={selectedVoiceTemplateId}
                onChange={(e) => setSelectedVoiceTemplateId(e.target.value)}
              >
                <option value="">-- Chọn khẩu lệnh mẫu --</option>
                {MOCK_AI_VOICES.map(voice => (
                  <option key={voice.id} value={voice.id}>{voice.description}</option>
                ))}
              </select>
            </div>

            {selectedVoiceTemplateId && !isVoiceProcessing && !voiceResult && (
              <div style={{ padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Volume2 size={24} style={{ color: '#a5b4fc', flexShrink: 0 }} />
                <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#e0e7ff' }}>"{MOCK_AI_VOICES.find(v => v.id === selectedVoiceTemplateId)?.transcript}"</p>
              </div>
            )}

            {selectedVoiceTemplateId && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                <button 
                  type="button" 
                  className="btn" 
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#c7d2fe', border: '1px solid rgba(99, 102, 241, 0.4)' }}
                  disabled={isVoiceProcessing}
                  onClick={() => handleVoiceCommand(selectedVoiceTemplateId)}
                >
                  {isVoiceProcessing ? 'AI đang lắng nghe và giải mã...' : 'Phát âm thanh khẩu lệnh mẫu'}
                </button>
              </div>
            )}

            {/* PROCESSING LOADING COMPONENT */}
            {isVoiceProcessing && (
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '24px' }}>
                  <span style={{ display: 'inline-block', width: '4px', height: '100%', backgroundColor: '#a5b4fc', animation: 'wave-bar 1s ease-in-out infinite alternate', borderRadius: '2px' }}></span>
                  <span style={{ display: 'inline-block', width: '4px', height: '80%', backgroundColor: '#a5b4fc', animation: 'wave-bar 1s ease-in-out infinite alternate 0.1s', borderRadius: '2px' }}></span>
                  <span style={{ display: 'inline-block', width: '4px', height: '120%', backgroundColor: '#a5b4fc', animation: 'wave-bar 1s ease-in-out infinite alternate 0.2s', borderRadius: '2px' }}></span>
                  <span style={{ display: 'inline-block', width: '4px', height: '70%', backgroundColor: '#a5b4fc', animation: 'wave-bar 1s ease-in-out infinite alternate 0.3s', borderRadius: '2px' }}></span>
                </div>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>Whisper & LLM đang phân tích ý định khẩu lệnh...</p>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes wave-bar {
                    0% { height: 6px; }
                    100% { height: 28px; }
                  }
                `}} />
              </div>
            )}

            {/* VOICE RESULT PANEL */}
            {voiceResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 'bold', fontSize: '14px' }}>
                  <CheckCircle size={16} />
                  <span>Đã phân tích cú pháp khẩu lệnh!</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Văn bản dịch (Whisper):</strong> <span style={{ fontStyle: 'italic' }}>"{voiceResult.transcript}"</span></div>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Hành động thực thi đề xuất:</strong>{' '}
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                      {voiceResult.actionType === 'add_patient' ? `Thêm hồ sơ Bệnh nhân mới: ${voiceResult.extractedData.name} (${CLINICAL_ROADMAPS[voiceResult.extractedData.treatmentType]?.name})` :
                       voiceResult.actionType === 'update_tooth' ? `Cập nhật răng ${voiceResult.extractedData.tooth} sang trạng thái Sâu răng cho bệnh nhân đang chọn` :
                       'Đánh dấu hoàn thành bước điều trị hiện tại của bệnh nhân đang chọn'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setVoiceResult(null)}>Thu âm lại</button>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: '#6366f1', color: 'white' }} onClick={handleConfirmVoiceAction}>Đồng ý thực thi lệnh</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
