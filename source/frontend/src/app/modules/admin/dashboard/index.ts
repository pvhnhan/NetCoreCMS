import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomSpinnerComponent } from '../../../shared/components/custom-spinner/custom-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CustomSpinnerComponent
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class AdminDashboardComponent implements OnInit {
  // Loading state
  isLoading = false;
  activeTab = 'used';

  // Năm được chọn để thống kê
  selectedYear = 2025;
  years = [2023, 2024, 2025, 2026];

  // Quick Stats với trend
  quickStats = [
    {
      icon: 'assignment',
      value: '156',
      label: 'Dự án',
      change: 12,
      trend: 'up'
    },
    {
      icon: 'people',
      value: '89',
      label: 'Nhân sự',
      change: 8,
      trend: 'up'
    },
    {
      icon: 'business',
      value: '34',
      label: 'Nhà cung cấp',
      change: -3,
      trend: 'down'
    },
    {
      icon: 'account_balance_wallet',
      value: '1.25B',
      label: 'Công nợ',
      change: 15,
      trend: 'up'
    }
  ];

  // Dữ liệu thống kê dự án theo trạng thái
  projectStats = [
    {
      status: 'Đang thực hiện',
      count: 45,
      members: 12,
      budgetInit: 850000000,
      budgetCurrent: 650000000,
      color: 'primary'
    },
    {
      status: 'Hoàn thành',
      count: 89,
      members: 8,
      budgetInit: 1200000000,
      budgetCurrent: 1150000000,
      color: 'success'
    },
    {
      status: 'Tạm dừng',
      count: 22,
      members: 5,
      budgetInit: 450000000,
      budgetCurrent: 380000000,
      color: 'warn'
    }
  ];

  // Dữ liệu vật tư sử dụng nhiều nhất
  topMaterials = [
    { name: 'Xi măng Hà Tiên', used: 1250, remain: 850 },
    { name: 'Thép xây dựng', used: 980, remain: 420 },
    { name: 'Gạch ốp tường', used: 750, remain: 320 },
    { name: 'Sơn Dulux', used: 680, remain: 280 }
  ];

  // Dữ liệu vật tư tồn kho nhiều nhất
  topRemainMaterials = [
    { name: 'Xi măng Hà Tiên', remain: 850 },
    { name: 'Thép xây dựng', remain: 420 },
    { name: 'Gạch ốp tường', remain: 320 },
    { name: 'Sơn Dulux', remain: 280 }
  ];

  // Các module quản trị hệ thống
  adminModules = [
    {
      name: 'Quản lý danh mục',
      desc: 'Thêm, sửa, xóa các loại danh mục',
      icon: 'category',
      route: '/admin/category-type',
      color: 'primary'
    },
    {
      name: 'Quản lý banner',
      desc: 'Quản lý banner hiển thị trên trang chủ',
      icon: 'image',
      route: '/admin/banner',
      color: 'accent'
    },
    {
      name: 'Quản lý menu',
      desc: 'Cấu hình menu điều hướng hệ thống',
      icon: 'menu',
      route: '/admin/menu',
      color: 'warn'
    },
    {
      name: 'Thông tin hệ thống',
      desc: 'Cập nhật thông tin công ty, liên hệ',
      icon: 'info',
      route: '/admin/system-info',
      color: 'success'
    }
  ];

  // Hoạt động gần đây
  recentActivities = [
    {
      icon: 'add',
      text: 'Thêm mới dự án "Trường Tiểu học ABC"',
      project: 'Trường Tiểu học ABC',
      user: 'Nguyễn Văn A',
      time: '2 phút trước',
      type: 'success'
    },
    {
      icon: 'edit',
      text: 'Cập nhật thông tin nhà cung cấp',
      project: 'Trường THCS XYZ',
      user: 'Trần Thị B',
      time: '15 phút trước',
      type: 'primary'
    },
    {
      icon: 'delete',
      text: 'Xóa vật tư hết hạn sử dụng',
      project: 'Trường Mầm non DEF',
      user: 'Lê Văn C',
      time: '1 giờ trước',
      type: 'warn'
    },
    {
      icon: 'download',
      text: 'Xuất báo cáo tháng 12/2024',
      project: 'Tất cả dự án',
      user: 'Phạm Thị D',
      time: '2 giờ trước',
      type: 'accent'
    },
    {
      icon: 'update',
      text: 'Cập nhật tiến độ dự án',
      project: 'Trường THPT GHI',
      user: 'Hoàng Văn E',
      time: '3 giờ trước',
      type: 'info'
    },
    {
      icon: 'assignment',
      text: 'Phân công nhân sự mới',
      project: 'Trường Tiểu học JKL',
      user: 'Vũ Thị F',
      time: '4 giờ trước',
      type: 'primary'
    }
  ];

  ngOnInit(): void {
    // Demo loading khi vào trang
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  refreshData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Getter methods for computed values
  get totalMembers(): number {
    return this.projectStats.reduce((sum, stat) => sum + stat.members, 0);
  }

  get totalMaterialsUsed(): number {
    return this.topMaterials.reduce((sum, item) => sum + item.used, 0);
  }

  get totalMaterialsRemain(): number {
    return this.topMaterials.reduce((sum, item) => sum + item.remain, 0);
  }

  get materialsNeedRestock(): number {
    return this.topMaterials.filter(item => item.remain < 100).length;
  }

  get materialsCount(): number {
    return this.topMaterials.length;
  }
} 