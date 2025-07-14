// Home Module - Angular Controller
// Controller xử lý trang chủ và thông tin hệ thống

cmsApp.controller('HomeController', ['$scope', 'ApiService', 'UtilityService', function($scope, ApiService, UtilityService) {
    
    // Khởi tạo dữ liệu
    $scope.systemInfo = null;
    $scope.dashboardStats = null;
    $scope.isLoading = false;
    
    // Load dữ liệu khi controller khởi tạo
    $scope.$on('$viewContentLoaded', function() {
        loadSystemInfo();
        loadDashboardStats();
    });
    
    // Hàm tải thông tin hệ thống
    function loadSystemInfo() {
        ApiService.get('/api/home/system-info').then(function(response) {
            $scope.systemInfo = response.data;
        }).catch(function(error) {
            console.error('Error loading system info:', error);
        });
    }
    
    // Hàm tải thống kê dashboard
    function loadDashboardStats() {
        $scope.isLoading = true;
        
        ApiService.get('/api/home/dashboard-stats').then(function(response) {
            $scope.dashboardStats = response.data;
        }).catch(function(error) {
            console.error('Error loading dashboard stats:', error);
        }).finally(function() {
            $scope.isLoading = false;
        });
    }
    
    // Hàm refresh dữ liệu
    $scope.refreshData = function() {
        loadSystemInfo();
        loadDashboardStats();
    };
    
}]); 