quizApp = angular.module('quizApp', []);

quizApp.controller('QuizController', function($scope, $http) {
	$scope.quizQuestions = [];
	$scope.rightAnswers = 0;

	// Gets all the quiz questions
	$http.get('/quizQuestions').then(function(response) {
		$scope.quizQuestions = response.data;
	});

	$scope.addQuestion = function() {
		if($scope.questionInput) {
			var correctAnswer = 0;
			if(document.getElementById("option1").checked)
				correctAnswer = 1;
			else if(document.getElementById("option2").checked)
				correctAnswer = 2;
			else if(document.getElementById("option3").checked)
				correctAnswer = 3;
			else if(document.getElementById("option4").checked)
				correctAnswer = 4;
			if (correctAnswer > 0) {
				$http.post('/quizQuestions', {
					"question": $scope.questionInput,
					"answer1": $scope.answer1Input,
					"answer2": $scope.answer2Input,
					"answer3": $scope.answer3Input,
					"answer4": $scope.answer4Input, 
					"isRight": 0,
					"correctAnswer": correctAnswer
				}).then(function(question) {
					$scope.quizQuestions.push(question.data);
				});
				$scope.questionInput = '';
				$scope.answer1Input = '';
				$scope.answer2Input = '';
				$scope.answer3Input = '';
				$scope.answer4Input = '';
			}
			else
				alert("Choose a correct answer");
		}
	};

	$scope.resetRight = function(k, isRight) {
		$http.put('/quizQuestions', {
    			_id: $scope.quizQuestions[0]._id,
    			isRight: 0
	    	}).then(function(data) {
    			$scope.quizQuestions[0].isRight = 0;
    		});
	};

	$scope.reset = function() {
		for (var k=0; k< quizQuestions.length; k++) {
			resetRight(k, $scope.quizQuestions[k].isRight);
	    }
    };

	$scope.delete = function() {
		$http.delete('/quizQuestions').then(function(response) {
			$scope.quizQuestions = [];
		});
	};
});

quizHTML = angular.module('quizHTML', []);

quizHTML.controller('answerController', function($scope, $http) {
	$scope.quizId = window.location.pathname.split('/')[2];
	$scope.quizQuestions = [];

			//update the status of the Todo

  	$scope.correctTest = function($index, isRight) {
  		if(document.getElementById("option" + $scope.quizQuestions[$index].correctAnswer + $index).checked){
    		$http.put('/quizQuestions', {
    			_id: $scope.quizQuestions[$index]._id,
      			isRight: 1
      		}).then(function(data) {
      			$scope.quizQuestions[$index].isRight = 1;
    		});
      	}

    	if (document.getElementById("option" + $scope.quizQuestions[$index].correctAnswer + $index).checked === false){
    		$http.put('/quizQuestions', {
    			_id: $scope.quizQuestions[$index]._id,
    			isRight: 0
    		}).then(function(data) {
    			$scope.quizQuestions[$index].isRight = 0;
    		});
    	}
    };

	$http.get('/quizQuestions').then(function(response) {
		$scope.quizQuestions = response.data;
	});
});