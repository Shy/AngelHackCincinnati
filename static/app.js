/*


// Declare app level module which depends on filters, and services
angular.module('bttr', [
	'ngRoute',
	'bttr.controllers'
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'index.html', controller: 'bttrController'})
}]);

angular.module('bttr.controllers')
.controller('bttrController', ['$scope',function($scope) {

	$scope.wordcloud = function() {
		console.log("test");
		var fill = d3.scale.category20();

		var url="http://angelhackcincinnati.herokuapp.com/apiexample?callback=?";
		$.getJSON(url,function(data){

			var words=$.map(data,function(d,idx) {return d.text.split(" ")});
			console.log(words);
			d3.layout.cloud().size([300, 300])
			.words(words.map(function(d) {
				return {text: d, size: 10 + Math.random() * 90};
			}))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();
		}).done(function() {
			console.log( "second success" );
		})
		.fail(function(jqxhr, textStatus, error) {
			console.log( textStatus+" "+error);
		})
		.always(function() {
			console.log( "complete" );
		});



		function draw(words) {
			d3.select("body").append("svg")
			.attr("width", 300)
			.attr("height", 300)
			.append("g")
			.attr("transform", "translate(150,150)")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})

			.text(function(d) { return d.text; });
		}
	};
	$scope.whatever =function (){
		$scope.doh = "test";
		alert($scope.doh)
	};



}
]);

*/

function bttrController ($scope)
{
	var stop=[];
	$scope.drawchart=function(container,mtag,pos,neg)
	{

			var chart = new CanvasJS.Chart(container, {
				title:{
					text: "Sentiment"
				},
				axisX:{
					tickThickness:0,
					lineThickness:0,
				},
				axisY:{
					tickThickness:0,
					lineThickness:0,
					minimum:-0.5,
					maximum:0.5,
					interval:0.25,
					gridThickness:0,
				},
      data: [  //array of dataSeries
      {
      	type: "column",
      	name: "Positive",
      	color: "green",
      	dataPoints: [
      	{ label:"+", y: pos },
      	]
      },
      {

      	type: "column",
      	name: "Negative",
      	color:"red" ,
      	dataPoints: [
      	{ label: "-", y: neg },
      	]
      }
      ]
  });
			chart.render();
	};

	$scope.populate1 = function(tag,tag2)
	{
		if(!tag&& !tag2)
		{	alert("Please enter a value!");
			return;
		}

		else if (!tag)
		{
			tag=tag2;
			tag2="";
		}

		var fill = d3.scale.category20();

		var url = "http:/angelhackcincinnati.herokuapp.com/api?number=10&hashtag="+tag+"&callback=?";
		//var url="http://angelhackcincinnati.herokuapp.com/apiexample?callback=?";


		function draw(words) {
			console.log("drawing");
			$("#cloud1").children("svg").remove();
			d3.select("#cloud1").append("svg")
			.attr("width", 600)
			.attr("height", 300)
			.append("g")
			.attr("transform", "translate(150,150)")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.text; });
		}
		$.getJSON(url,function(data){

			var words=$.map(data,function(d,idx) {

				var list=d.text.toLowerCase().split(" ");

			return $.grep(list,function(elem,idx)
				{
					if(!isNaN(parseInt(elem)))
						return true;
					if(elem.length <4)
						return true;
					if(elem.charAt(0)==='#'||elem.charAt(0)==='@')
					{
						//ignore hashtags

						return true;
					}
					if (elem.substr(0,4)==='http')
					{
						//ignore urls
						return true;
					}
					return stop.some(function(f)
					{
						return elem === f;
					});

				},true);



			});
			var pcnt=0;
			var ncnt=0;
			var pos=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue > 0)
				{
					pcnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;
			},0
			);
			var neg=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue < 0)
				{
					ncnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;

			},0
			);
			pos/=(pcnt+ncnt);
			neg/=(ncnt+pcnt);
			console.log("pcnt: "+pcnt);
			console.log ("ncnt: "+ncnt);
			console.log("pos: " + pos);
			console.log("neg: " + neg);
			$scope.drawchart("sent1",tag,pos,neg);

			var wordsize={};
			$.each(words, function(i,sel)
			{
				if(sel.charAt(0)=='#')
					sel = sel.substr(1);
				if(isNaN(wordsize[sel])||wordsize[sel]===null)
				{
					wordsize[sel]=1;

				}	else
					{
						wordsize[sel]++;
					}

			});
			console.log(wordsize);

			uWords=words.filter(function(value,index,self)
			{
				 return self.indexOf(value) === index;
			}
				);
			console.log(words);
			d3.layout.cloud().size([450, 300])
			.words(uWords.map(function(d) {
				return {text: d, size: wordsize[d]* 30};
			}))
			.padding(0)
			.rotate(function() { return ~~(Math.random() * 2) * 0; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();


		});

		if(tag2)
		{
			//var url="http://angelhackcincinnati.herokuapp.com/apiexample?callback=?";
			var url = "http:/angelhackcincinnati.herokuapp.com/api?number=10&hashtag="+tag2+"&callback=?";

		function draw2(words) {
			console.log("drawing2");
			$("#cloud2").children("svg").remove();
			d3.select("#cloud2").append("svg")
			.attr("width", 600)
			.attr("height", 300)
			.append("g")
			.attr("transform", "translate(150,150)")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.text; });
		}
		$.getJSON(url,function(data){

			var words=$.map(data,function(d,idx) {

				var list=d.text.toLowerCase().split(" ");

				return $.grep(list,function(elem,idx)
				{
					if(!isNaN(parseInt(elem)))
						return true;
					if(elem.length <4)
						return true;
					if(elem.charAt(0)==='#'||elem.charAt(0)==='@')
					{
						//ignore hashtags

						return false;
					}
					if (elem.substr(0,4)==='http')
					{
						//ignore urls
						return true;
					}
					return stop.some(function(f)
					{
						return elem === f;
					});

				},true);



			});
			var pcnt=0;
			var ncnt=0;
			var pos=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue > 0)
				{
					pcnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;
			},0
			);
			var neg=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue < 0)
				{
					ncnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;

			},0
			);
			pos/=(pcnt+ncnt);
			neg/=(ncnt+pcnt);
			console.log("pcnt: "+pcnt);
			console.log ("ncnt: "+ncnt);
			console.log("pos: " + pos);
			console.log("neg: " + neg);
			$scope.drawchart("sent2",tag,pos,neg);

			var wordsize={};
			$.each(words, function(i,sel)
			{
				if(sel.charAt(0)=='#')
					sel = sel.substr(1);
				if(isNaN(wordsize[sel])||wordsize[sel]===null)
				{
					wordsize[sel]=1;

				}	else
					{
						wordsize[sel]++;
					}

			});
			console.log(wordsize);

			uWords=words.filter(function(value,index,self)
			{
				 return self.indexOf(value) === index;
			}
				);
			console.log(words);
			d3.layout.cloud().size([450, 300])
			.words(uWords.map(function(d) {
				return {text: d, size: wordsize[d]* 30};
			}))
			.padding(0)
			.rotate(function() { return ~~(Math.random() * 2) * 0; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw2)
			.start();


		});
		}
};


}
