var sampleTimeSec = 0.1;                  ///< sample time in sec
var sampleTimeMsec = 1000*sampleTimeSec;  ///< sample time in msec
var maxSamplesNumber = 100;               ///< maximum number of samples

var xdata; ///< x-axis labels array: time stamps
var ydata1; ///< y-axis data array: random value
var ydata2; ///< y-axis data array: random value
var lastTimeStamp; ///< most recent time stamp 

var chartContext;  ///< chart context i.e. object that "owns" chart
var chart_1;         ///< Chart.js object
var chart_2;         ///< Chart.js object

var timer; ///< request timer


const url = 'http://192.168.1.91/client_LAB_09/HTML/servermock/chartdata.json';
const url_config = 'http://192.168.1.91/client_LAB_09/HTML/servermock/config_file.json';


/**
* @brief Add new value to next data point.
* @param y New y-axis value 
*/
function addData(y1, y2){
	if(ydata1.length  > maxSamplesNumber || ydata2.length  > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	ydata1.push(y1);
	ydata2.push(y2);
	chart_1.update();
	chart_2.update();
}

/**
* @brief Remove oldest data point.
*/
function removeOldData(){
	xdata.splice(0,1);
	ydata1.splice(0,1);
	ydata2.splice(0,1);
}

/**
* @brief Start request timer
*/
function startTimer(){
	timer = setInterval(ajaxJSON, sampleTimeMsec);
}

/**
* @brief Stop request timer
*/
function stopTimer(){
	clearInterval(timer);
}

/**
* @brief Send HTTP GET request to IoT server
* update params from config file
*/
function ajaxJSON_Config() {
	$.ajax(url_config, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			sampleTimeMsec = responseJSON.Sample_time;
			maxSamplesNumber = responseJSON.Max_number_of_samples;
			
			
			$("#sampletime").text(sampleTimeMsec.toString());
			$("#samplenumber").text(maxSamplesNumber.toString());
			$("#sampleTimeInput").text(sampleTimeSec.toString());
		}
	});
}

/**
* @brief Send HTTP GET request to IoT server
*/
function ajaxJSON() {
	$.ajax(url, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addData(+responseJSON.roll, +responseJSON.pitch);
		}
	});
}

/**
* @brief Chart initialization
*/
function chartInit()
{
	
	// array with consecutive integers: <0, maxSamplesNumber-1>
	xdata = [...Array(maxSamplesNumber).keys()]; 
	// scaling all values ​​times the sample time 
	xdata.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

	// last value of 'xdata'
	lastTimeStamp = +xdata[xdata.length-1]; 

	// empty array
	ydata1 = []; 
	ydata2 = []; 

	// get chart context from 'canvas' element
	chartContext_1 = $("#chart_1")[0].getContext('2d');
	chartContext_2 = $("#chart_2")[0].getContext('2d');

	chart_1 = new Chart(chartContext_1, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'roll',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: ydata1,
				lineTension: 0
			}
			]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Angle roll [deg]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	});
	
	chart_2 = new Chart(chartContext_2, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [
			{
				fill: false,
				label: 'pitch',
				backgroundColor: 'rgb(0, 255, 0)',
				borderColor: 'rgb(0, 255, 0)',
				data: ydata2,
				lineTension: 0
			}
			]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Angle pitch [rad]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	});
	
	ydata1 = chart_1.data.datasets[0].data;
	ydata2 = chart_2.data.datasets[0].data;
	
	xdata = chart_1.data.labels;
	xdata = chart_2.data.labels;

}

$(document).ready(() => { 
	//ajaxJSON_Config();
	
	chartInit();
	
	$("#start").click(startTimer);
	$("#stop").click(stopTimer);
	$("#sampletime").text(sampleTimeMsec.toString());
	$("#samplenumber").text(maxSamplesNumber.toString());
	$("#sampleTimeInput").text(sampleTimeSec.toString());

	$("#btn").click(()=>{
		sampleTimeSec = document.getElementById("sampleTimeInput").value;
		$("#samplenumber").text(maxSamplesNumber.toString());
		sampleTimeMsec = sampleTimeSec*1000;
		$("#sampletime").text(sampleTimeMsec.toString());
		chartInit();
	});

	
});