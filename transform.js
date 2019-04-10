function transformVolunteeerDetails (response) {
    const {
        duration,
        earliest_start_date,
        latest_end_date,
        specifics_info,
        applications_count,
        languages
    } = response
    const transformedResponse ={
        language: {
            label: 'LANGUAGE',
            value: languages[0].name
        },
        earliestStartDate: {
            label: 'EARLIEST START DATE',
            value: convertDateFormat(earliest_start_date)
        },
        latestEndDate: {
            label: 'LATEST END DATE',
            value: convertDateFormat(latest_end_date)
        },
        duration: {
            label: 'DURATION',
            value: duration + ' Weeks'
        },
        salary: {
            label: "SALARY",
            value: specifics_info.salary
        },
        positions: {
            label: 'POSITIONS',
            value: applications_count
        }
    } 

    return transformedResponse
}

function transformPrerequisitiesList (response) {
    const { backgrounds, skills, nationalities, languages } = response
    const transformedResponse = [
        {
            label: "Backgrounds",
            value: backgrounds
        },
        {
            label: "Skills",
            value: skills
        },
        {
            label: "Citizenships",
            value: nationalities
        },
        {
            label: "Languages",
            value: languages
        }
    ]

    return transformedResponse
}

function transformLogisticsDetails (response) {
    const { food_covered, food_weekends, accommodation_covered, accommodation_provided } = response.logistics_info
    const transformedList = [
        {
            label: 'food_covered',
            value: food_covered
        },
        {
            label: 'food_weekends',
            value: food_weekends
        },
        {
            label: 'accommodation_covered',
            value: accommodation_covered
        },
        {
            label: 'accommodation_provided',
            value: accommodation_provided
        }
    ]
    return transformedList
}

function transformLegalDetails (response) {
    const { visa_link, visa_type, visa_duration, health_insurance_info } = response.legal_info
    const transformedList = [         {
            label: "VISA TYPE",
            value: visa_type
        },
        {
            label: "VISA DURATION",
            value: visa_duration
        },
        {
            label: "VISA LINK",
            value: visa_link
        },
        {
            label: 'Health Insurance',
            value: health_insurance_info
        }
    ]

    return transformedList

}

function convertDateFormat (date) {
    date = new Date(date).toString()

    const formatedDate = date.slice(8,10)
    const month = date.slice(4,7)
    const year = date.slice(11,15)

    date = formatedDate + ' ' + month + ' ' + year
    return date
}

function getWorkingHoursDetail ( response ) {
    const {saturday_work, expected_work_schedule} = response.specifics_info
    const workingTimings = expected_work_schedule.from + 'AM to '+ expected_work_schedule.to + 'PM'

    return workingHours = [
        {
            label: 'Working Hours',
            value: workingTimings
        },
        {
            label: 'Working Weekends',
            value: saturday_work ? workingTimings : 'Not on weekends'
        }
    ]
}

function transformOpportunityDetails (response) {
    const transformedResponse = {
        title: (response && response.title) || '',
        id: (response && response.id) || '',
        description: (response && response.description) || '',
        location: (response && response.location) || '',
        earliestStartDate: convertDateFormat(response && response.earliest_start_date) || '',
        latestEndDate: convertDateFormat(response && response.latest_end_date) || '',
        applicationCloseDate: convertDateFormat(response && response.applications_close_date) || '',
        volunteerDetails: transformVolunteeerDetails(response),
        prerequisitesList: transformPrerequisitiesList(response),
        visalogisticsDetails: transformVisaLogisticsDetaisl(response),
        selectionProcess: (response && response.role_info && response.role_info.selection_process) || '',
        city: (response && response.role_info && response.role_info.city) || '',
        mainActivities: (response && response.role_info && response.role_info.learning_points_list) || [],
        backgrounds: (response && response.backgrounds) || '',
        skills: (response && response.skills) || '',
        host_lc: (response && response.host_lc) || '',
        logisticDetails: transformLogisticsDetails(response),
        legalDetails: transformLegalDetails(response),
        coverPhoto: (response && response.cover_photo_urls) || '',
        salary: ( response && response.specifics_info && response.specifics_info.salary) || '',
        workingHours: getWorkingHoursDetail(response)
    }
    return transformedResponse
}

function transformVisaLogisticsDetaisl (response) {
    const { visa_type, visa_duration, visa_link } = response 
    const transformedResponse = [
        {
            label: "VISA TYPE",
            value: visa_type
        },
        {
            label: "VISA DURATION",
            value: visa_duration
        },
        {
            label: "VISA LINK",
            value: visa_link
        }
    ]

    return transformedResponse
}

function transformListDetails (item) {
    const {id, name} = item
    return {
        id,
        name
    }
}

function transformList (response) {
    const transformedResponse = response.map(transformListDetails)
    return transformedResponse
}

function transformListRequest (list) {
    const { id } = list
    return {
        id,
        option: "preferred",
        level: 0
    }
}

function convertToRequestDateFormat (dateString) {
    const date = new Date(dateString),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    const formatedDate = [ date.getFullYear(), mnth, day ].join("-");
    return formatedDate+'T00:00:00Z'
}

function transformRequest (input) {
    const {
        title,
        description,
        earliestStartDate,
        latestEndDate,
        selectionProcess,
        salary,
        backgroundList,
        skillList,
        city,
    } = input
    const transformedRequest = {
        opportunity: {
            title,
            description,
            earliest_start_date: convertToRequestDateFormat(earliestStartDate),
            latest_end_date: convertToRequestDateFormat(latestEndDate),
            specifics_info: {
                salary
            },
            role_info: {
                selection_process: selectionProcess,
                city
            },
            skills: skillList.map(transformListRequest),
            backgrounds: backgroundList.map(transformListRequest)
        }
    }
    
    return transformedRequest
}

module.exports = {
    transformOpportunityDetails,
    transformList,
    transformRequest
}