import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { LazyImageDirective } from '../../shared/directives/lazy-image.directive';
import { ErrorBoundaryComponent } from '../../shared/components/error-boundary/error-boundary.component';
import { LoginOverlayComponent } from '../authentication/login/index';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    LazyImageDirective,    
    ErrorBoundaryComponent,
    LoginOverlayComponent
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class HomeComponent implements OnInit {
  showLoginOverlay = false;
  animateManagementCards = true;
  animateProjectCards = true;
  animateProjectSection = false;
  animateProjectContent = false;
  
  managementCards = [
    {
      icon: 'business',
      iconClass: 'management-icon--supplier',
      title: 'Quản lý nhà cung cấp',
      desc: 'Quản lý danh sách nhà cung cấp, đánh giá chất lượng và hợp đồng',
      tags: ['Danh bạ nhà cung cấp', 'Đánh giá chất lượng', 'Quản lý hợp đồng']
    },
    {
      icon: 'account_balance_wallet',
      iconClass: 'management-icon--debt',
      title: 'Quản lý công nợ',
      desc: 'Theo dõi và quản lý các khoản công nợ, thanh toán và báo cáo tài chính',
      tags: ['Công nợ phải trả', 'Công nợ phải thu', 'Báo cáo tài chính']
    },
    {
      icon: 'assignment',
      iconClass: 'management-icon--project',
      title: 'Quản lý dự án',
      desc: 'Theo dõi tiến độ, ngân sách và tài nguyên của từng dự án',
      tags: ['Tiến độ dự án', 'Quản lý ngân sách', 'Kế hoạch nguồn lực']
    },
    {
      icon: 'inventory',
      iconClass: 'management-icon--inventory',
      title: 'Quản lý vật tư',
      desc: 'Quản lý kho vật tư, theo dõi xuất nhập và kiểm kê định kỳ',
      tags: ['Quản lý kho', 'Xuất nhập vật tư', 'Kiểm kê định kỳ']
    }
  ];

  projectCards = [
    {
      icon: 'people',
      title: 'Quản lý nhân sự',
      desc: 'Quản lý thông tin nhân viên, lịch làm việc và đánh giá hiệu suất',
      tags: ['Quản lý nhân viên', 'Lịch làm việc', 'Đánh giá hiệu suất']
    },
    {
      icon: 'schedule',
      title: 'Quản lý tiến độ',
      desc: 'Theo dõi tiến độ dự án và quản lý thời gian thực hiện',
      tags: ['Timeline', 'Milestone', 'Deadline']
    },
    {
      icon: 'attach_money',
      title: 'Quản lý ngân sách',
      desc: 'Theo dõi chi phí và tối ưu hóa ngân sách dự án',
      tags: ['Budget', 'Cost', 'Finance']
    },
    {
      icon: 'notifications',
      title: 'Thông báo',
      desc: 'Nhận thông báo real-time về tiến độ dự án',
      tags: ['Alerts', 'Notifications', 'Real-time']
    },
    {
      icon: 'analytics',
      title: 'Báo cáo & thống kê',
      desc: 'Phân tích dữ liệu và tạo báo cáo chi tiết dự án',
      tags: ['Reports', 'Analytics', 'Insights']
    },
    {
      icon: 'security',
      title: 'Quản lý chất lượng',
      desc: 'Kiểm soát chất lượng sản phẩm và quy trình sản xuất',
      tags: ['Quality Control', 'Standards', 'Compliance']
    }
  ];

  ngOnInit() {
    // Animation cho management cards (3 giây)
    setTimeout(() => {
      this.animateManagementCards = false;
    }, 3000);
    
    // Animation cho project cards (3 giây)
    setTimeout(() => {
      this.animateProjectCards = false;
    }, 3000);
    
    // Intersection Observer cho project section
    this.setupProjectSectionObserver();
  }

  private setupProjectSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animation cho content trước
          this.animateProjectContent = true;
          
          // Trigger animation cho cards sau 0.5s
          setTimeout(() => {
            this.animateProjectSection = true;
          }, 500);
          
          // Giữ content hiển thị, chỉ tắt animation cho cards sau 3 giây
          setTimeout(() => {
            // Giữ animateProjectContent = true để content luôn hiển thị
            // Chỉ tắt animation cho cards
          }, 3000);
          
          // Chỉ trigger một lần
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3, // Trigger khi 30% section hiển thị
      rootMargin: '0px 0px -100px 0px' // Trigger sớm hơn 100px
    });

    // Observe project section
    const projectSection = document.querySelector('.home__project-management');
    if (projectSection) {
      observer.observe(projectSection);
    }
  }

  scrollSlider(direction: 'prev' | 'next') {
    const slider = document.getElementById('productCards');
    if (slider) {
      const scrollAmount = 350; // Khoảng cách scroll mỗi lần
      const currentScroll = slider.scrollLeft;
      
      if (direction === 'prev') {
        slider.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        });
      } else {
        slider.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }
} 