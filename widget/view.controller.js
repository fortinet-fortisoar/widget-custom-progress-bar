'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('happinessQuotient100Ctrl', happinessQuotient100Ctrl);

    happinessQuotient100Ctrl.$inject = ['$scope', 'config', 'FormEntityService', '$state', 'PagedCollection', '$rootScope', '$timeout'];

    function happinessQuotient100Ctrl($scope, config, FormEntityService, $state, PagedCollection, $rootScope, $timeout) {

        $scope.progress = 0;
        var bubblesCount = 5;
        $scope.bubbles = [];
        $scope.foams = [];
        $scope.currentTheme = $rootScope.theme.id;
        $scope.page = $state.params.page;
        $scope.loadViewData = loadViewData;
        $scope.loadDashboardOrReportingData = loadDashboardOrReportingData;
        $scope.fillMug = fillMug;

        // This code handles data to be calculated for view panel
        function loadViewData() {
            var fieldValue = null;
            // If Module donot have any integer field then selectInput will be undefined
            if (config.selectInput !== undefined) {
                fieldValue = FormEntityService.get().fields[config.selectInput].value;
            }
            // If field value is null change it to 0
            if (fieldValue == null) {
                fieldValue = 0;
            }
            // If value of form field is less or equal than min provided by user set it 0
            if (fieldValue <= config.minLength) {
                $scope.progress = 0;
            }
            // If value of form field is greater or equal than max provided by user set it 100
            else if (fieldValue >= config.maxLength) {
                $scope.progress = 100;
            }
            // Calculate progress percentage and convert the value till 1 decimal then save progress
            else {
                $scope.progress = parseFloat(((fieldValue / config.maxLength) * 100).toFixed(1));
            }
            // In any case if value of progress if null set it to 0
            if ($scope.progress === null && typeof ($scope.progress) !== undefined) {
                $scope.progress = 0;
            }
            $timeout(function() {
                fillMug()
            }, 100);
        }

        // This code handles data to be calculated for dashboard
        function loadDashboardOrReportingData() {
            var total = 0;
            var filtered = 0;
            // Variable an pagedCollection to get data based on query 1
            var totalFilter = angular.copy(config);
            totalFilter.query = totalFilter.totalCountQuery;
            var pagedTotalData = new PagedCollection(totalFilter.module, null, null);
            // Variable an pagedCollection to get data based on query 2
            var progressFilter = angular.copy(config);
            progressFilter.query = angular.copy(progressFilter.progressCountQuery);
            progressFilter.query.logic = 'AND';
            progressFilter.query.filters = [];
            progressFilter.query.filters.push(progressFilter.totalCountQuery);
            progressFilter.query.filters.push(progressFilter.progressCountQuery);
            var pagedProgressData = new PagedCollection(progressFilter.module, null, null);
            // This is to get total count of records of a module
            pagedTotalData.loadByPost(totalFilter).then(function () {
                total = pagedTotalData.totalItems;
                // Check if total records is greater than 0
                if (total > 0) {
                    // Get total count records which satisfies the filter condition
                    pagedProgressData.loadByPost(progressFilter).then(function () {
                        filtered = pagedProgressData.totalItems;
                        // Calculate progress percentage and convert the value upto 1 decimal then save progress
                        $scope.progress = parseFloat(((filtered / total) * 100).toFixed(1));
                        if ($scope.progress > 100) {
                            $scope.progress = 100;
                        }
                        fillMug(); // Fill mug according to values
                    }, angular.noop);
                }
                // Total count is 0, set progress to 0
                else {
                    $scope.progress = 0;
                    fillMug();
                }
                $scope.processing = false;
            }, angular.noop).finally(function () {
                $scope.processing = false;
            });
        }

        function init() {
            for (let j = 1; j <= 4; j++) {
                let y = {
                    'classDetail': 'foam top-glass-foam-' + j + ' foam-' + $scope.currentTheme
                }
                $scope.foams.push(y);
            }
            // Sets random id for class juice to fill it separately
            $scope.juiceId = 'juice-' + Math.floor(Math.random() * 1000000001);
            if ($scope.page !== 'dashboard' && $scope.page !== 'reporting') {
                $scope.loadViewData();
            }
            else {
                $scope.loadDashboardOrReportingData();
            }
        };
        init();
        
        // Handling all mug filling related situations
        function fillMug() {
            // Get class juice based on particular id
            var changeJuiceLevel = angular.element(document.querySelector("#" + $scope.juiceId));
            if ($scope.progress === 0) {
                changeJuiceLevel.css({ 'background': 'transparent' });
            }
            // If update remained null set height to 0
            else if ($scope.progress === null) {
                changeJuiceLevel.css({ 'height': 0 });
            }
            else {
                // Changes juice css according to progress to fill mug
                changeJuiceLevel.css({ 'background': '#fbb117', 'height': $scope.progress + '%', top: (100 - $scope.progress) + '%' });
                // Checks wether bubbles array exists, if not then create
                if ($scope.bubbles.length === 0) {
                    for (let i = 1; i <= bubblesCount; i++) {
                        var x = {
                            'name': 'bubbles bubble-' + Math.floor(Math.random() * 1000000001),
                            'style': {
                                'left': (Math.random() * 100) + '%',
                                'animation-delay': (1000 + Math.random() * 1000) + 'ms',
                                'animation-duration': (1000 + Math.random() * 1000) + 'ms'
                            }
                        };
                        $scope.bubbles.push(x);
                    }
                }
            }
        }
    }
})();
