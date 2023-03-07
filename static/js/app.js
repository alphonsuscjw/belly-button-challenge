// Get the samples endpoint
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize a data variable to hold JSON data here so that it can be used by various functions
let data;

// Fetch the JSON data using then function
d3.json(samples).then(function(data_response) {
    
    // Let the data variable hold the JSON data
    data = data_response;

    // Append options for the dropdown menu
    appendOptions();

    // Call the optionChanged function when the user selects a new option from the dropdown menu (the trigger event)
    d3.select("#selDataset").on("change", function() {
        optionChanged(this.value);
    });

    //Initialise the dashboard
    init();

});

// Function to append options to the dropdown menu and assign each name as option text and to the "value" property for each option
function appendOptions () {
    for (let i = 0; i < data.names.length; i++) {
        let option = d3.select("#selDataset").append("option");
        option.text(data.names[i]);
        option.attr("value", data.names[i]);
    }
};

// This function is called when the user selects a new option from the dropdown menu (the trigger event)
function optionChanged(selectedOption) {

    //Call the drawBarChart function to draw the horizontal bar chart for the selected option
    drawBarChart(selectedOption, data);

    //Call the drawBubbleChart function to draw the bubble chart for the selected option
    drawBubbleChart(selectedOption, data);

    //Call the showMetadata function to show the metadata for the selected option
    showMetadata(selectedOption, data);
}

// Initialises the page with the data for ID = 940
function init() {
    
    let defaultID = "940";

    //Call the drawBarChart function to draw the horizontal bar chart for the default ID
    drawBarChart(defaultID, data);

    //Call the drawBubbleChart function to draw the bubble chart for the default ID
    drawBubbleChart(defaultID, data);

    //Call the showMetadata function to show the metadata for the default ID
    showMetadata(defaultID, data);
}

// Function to draw the horizontal bar chart
function drawBarChart(ID, data_js) {

    // Filter the data samples to get the sample data for the input ID
    let inputSample = data_js.samples.filter(sample => sample.id === ID);

    // Sort the inputSample by sample_values in the descending order
    inputSample.sort((a, b) => b.sample_values - a.sample_values);

    // Slice the top 10 values and reverse the array to accommodate Plotly's defaults
    slicedReversedSample = inputSample.map(item => ({
        "id": item.id,
        "sample_values": item.sample_values.slice(0, 10).reverse(),
        "otu_ids": item.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id), // Add "OTU " string in front of each id
        "otu_labels": item.otu_labels.slice(0, 10).reverse()
    })) 

    let trace = {
        x: slicedReversedSample[0].sample_values,
        y: slicedReversedSample[0].otu_ids,
        text: slicedReversedSample[0].otu_labels,
        type: "bar",
        orientation: "h"
    };

    let traceData = [trace];

    Plotly.newPlot("bar", traceData);
}

// Function to draw the bubble chart
function drawBubbleChart(ID, data_js) {

    // Filter the data samples to get the sample data for the input ID
    let inputSample = data_js.samples.filter(sample => sample.id === ID);
    
    let trace = {
        x: inputSample[0].otu_ids,
        y: inputSample[0].sample_values,
        text: inputSample[0].otu_labels,
        mode: "markers",
        marker: {
            size: inputSample[0].sample_values,
            color: inputSample[0].otu_ids
        }
    };

    let traceData = [trace];

    let layout = {
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bubble", traceData, layout);

}

// Function to show the metadata
function showMetadata(ID, data_js) {
    
    // Filter the data samples to get the metadata for the input ID
    let inputDemographic = data_js.metadata.filter(individual => individual.id == ID);

    // Select the div with "sample-metadata" as its id
    let demographicInfo = d3.select("#sample-metadata");

    // Clear out any pre-existing metadata
    demographicInfo.html("");

    // Use Object.entries to iterate over the key-value pairs of the first object in the inputDemographic array
    // and then append an h5 element to the sample-metadata div for each key-value pair, with the key and value concatenated into a string.
    Object.entries(inputDemographic[0]).forEach(([key, value]) => {
        demographicInfo.append("h5").text(`${key}: ${value}`);
    });

}