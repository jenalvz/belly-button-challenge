// Place URL into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch JSON data and console.log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initializing dashboard
function init() {

    // Select dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Get sample names and populate the drop down
    d3.json(url).then((data) => {

        // Define a variable for the sample names
        let sample_names = data.names;

        sample_names.forEAch((id) => {
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });


        // Set first sample
        let sample1 = names[0];
    
        // Console.log first value to test it
        console.log(sample1);

        // Begin building the plots
        buildMetadata(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1);
    });
};



// Populating data/info
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        
        // Retrieve metadata
        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        let valueData = value[0];

        d3.select("#sample-metadata").html("");   

        
        // Using Object.entries to add k/v pairs 
        Object.entries(valueData).forEach(([key,value]) => {
            
            // Console.log the k/v pairs
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });

};


// Building the bar chart
function buildBarChart(sample) {

    // Using D3 to retrieve all data
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == sample);
        let valueData = value[0];

        // Use otu_ids as the labels for the bar chart
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sampleValues = valueData.sampleValues;

        // Console.log the data
        console.log(otu_ids, otu_labels, sampleValues);

        // Set up chart display items
        let x = sampleValues.slice(0,10).reverse();
        let y = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();


        // Set up trace for the bar charts
        let trace1 = {
            x: x,
            y: y,
            text: labels,
            type: 'bar',
            orientation: 'h',
        };

        // Set up layout
        let layout1 = {
            title: 'Top 10 OTUs',
        };

        // Plot using Plotly
        Plotly.newPlot("bar", [trace1], [layout1])
    });
};

// Setting up the function to build a bubble chart
function buildBubbleChart(sample) {

    // REtrieving data with D3
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == sample);
        let valueData = value[0];

        // Use otu_ids as the labels for the chart
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sampleValues = valueData.sampleValues;

        // Console.log the data
        console.log(otu_ids, otu_labels, sampleValues);

        // Set up trace for the bubble chart
        let trace2 = {
            x: otu_ids,
            y: sampleValues,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otu_ids,
                colorscale: 'Earth'
            }
        };


        // Setting up layout
        let layout2 = {
            title: 'Bacteria Per Sample',
            xaxis: {title: 'OTU ID'},
        };

        // Plot using Plotly
        Plotly.newPlot('bubble', [trace2,layout2])
    });
};



// Finally needs to update the dash whenever sample is changed
function optionChanged(value) {

    // Console.log new value
    console.log(value);

    // Calling all the funx
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
};


init();




