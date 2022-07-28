# Happiness Quotient

The Happiness Quotient displays a filtered image of records, as a percentage, of the total number of records based on some two-level filter criteria, which you define on dashboards and reports, subsequently indicating the progress of the record set. On the view panel, it displays the progress made on a particular record based on the field you have specified.

### Using the Happiness Quotient Widget on Dashboards or Report Pages

An example of using the Happiness Quotient widget on the dashboard or reports page would be displaying the alert records as a percentage of alert records to indicate the progress of the alert record set as per the following filter criteria:

- Created on or earlier than 7 days
- Severity set to 'High' or 'Critical' 

This defines the first criteria, i.e., the criterion that determines the total number of records to be considered. For example, if there are 500 alert records in your system, applying these filter criteria could bring the number of alerts down to `58` alerts. These `58` alerts would be considered as the total number of records on which an additional filter where *State* is *Investigating* is set; defining the subset of records that are ultimately displayed in the Happiness Quotient image on the dashboard or reports page.

### Using the Happiness Quotient Widget on the View Panel

An example of using the Happiness Quotient widget on the View Panel would be monitoring the progress, as a percentage, for a particular incident record based on a selected field and the set minimum and maximum values. 

> **NOTE**: The chosen field for monitoring the progress must be of type *Integer* or *Number*. The minimum and maximum values of the field (if set) are retrieved from the database. The values must not be negative.
>

For example, if you want to view the progress made on an incident record based on the time that record has spent in the *Containment* phase, you can select the input field as *Containment Time (in minutes)* and specify the minimum time (in minutes), for example, `0`, and maximum time (in minutes), for example, `480`. Now, if the record has its *Containment Time (in minutes)* field set as `120`, the  Happiness Quotient widget displays 25%.

## Version Information

**Version**: 1.0.0

**Certified**: No

**Publisher**: Fortinet  

**Applicable**: Dashboard, Reports, and View Panel

## Happiness Quotient Views

**Happiness Quotient Edit View on Dashboards or Reports**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-happiness-quotient/release/1.0.0/docs/media/hQ-edit-view-dashboard.png" alt="Editing the Happiness Quotient widget on the dashboard or reports page" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**Happiness Quotient - Dashboards or Reports page**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-happiness-quotient/release/1.0.0/docs/media/hQ-view-dashboard.png" alt="Viewing the Happiness Quotient widget on the dashboard or reports page" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**Happiness Quotient Edit View on the View Panel**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-happiness-quotient/release/1.0.0/docs/media/hQ-edit-view-viewPanel.png" alt="Editing the Happiness Quotient widget on the View Panel" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**Happiness Quotient - View Panel**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-happiness-quotient/release/1.0.0/docs/media/hQ-view-viewPanel.png" alt="Viewing the Happiness Quotient widget on the View Panel page" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

## Happiness Quotient Settings

**Happiness Quotient Settings -  Dashboards or Reports page**  

Provide the following details to customize the Happiness Quotient widget on the Dashboards or Reports page to suit your requirements:

| Fields                                   | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| Title                                    | Specify the heading or title of the image that represents the Happiness Quotient widget. |
| Data Source                              | Select the data source (module) for which you want to view the Happiness Quotient image. For example, Alerts. |
| Filter Criteria - Total Number of Records | Specify the filter criteria that define the total number of records. |
| Filter Criteria - Progress Record Set    | Specify the filter criteria that define the subset of records (within the total number of records that are defined using `Filter Criteria - Total Number of Records`) indicating the progress of the record set. |

**Happiness Quotient Settings - View Panel page**  

Provide the following details to customize the Happiness Quotient widget on the View Panel to suit your requirements:

| Fields      | Description                              |
| ----------- | ---------------------------------------- |
| Title       | Specify the heading or title of the image that represents the Happiness Quotient widget. |
| Data Source | The Data source (module) of the record for which you want to view progress. This is already selected and cannot be changed. |
| Input Field | Select the field based on which you want to monitor the progress of the particular record. The field that you choose for monitoring the progress must be of the type *Integer* or *Number*. |
| Min         | Specify the minimum value that can be set for the selected input field. The minimum value for the input field (if set) is retrieved from the database. You can change this value according to your requirements; however, its value must not be negative. |
| Max         | Specify the maximum value that can be set for the selected input field. The maximum value for the input field (if set) is retrieved from the database. You can change this value according to your requirements; however, its value must not be negative. |
