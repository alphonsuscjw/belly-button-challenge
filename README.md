# belly-button-challenge

This challenge builds an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogues the microbes that colonise human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

To construct the dashboard, I first used the D3 library to read the data from sample.json. Next, I created the dropdown menu with all the IDs as the options. I then created a horizontal bar chart to display the top 10 OTUs found in an individual, created a bubble chart that displays each sample for that same individual and displayed that individual's demographic information on the left side of the dashboard. I set the trigger event for changing the plots to reflect another ID's data to be when a new option is selected from the dropdown menu. Lastly, I deployed this dashboard to Github Pages.

By default, the dashboard displays the plots for the first ID (940). When a user selects another ID from the dropdown menu, these plots are all automatically updated to display data for that ID.
