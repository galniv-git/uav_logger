export var store = {
    // current_trajectory: [],
    // time_trajectory: {},
    // time_attitude: {},
    // time_attitudeQ: {},
    show_params: false,
    show_radio: false,
    show_messages: false,
    flight_mode_changes: [],
    cssColors: [],
    colors: [],
    map_available: false,
    show_map: true,
    currentTime: false,
    processDone: false,
    plot_on: false,
    processStatus: 'Formatting...',
    processPercentage: -1,
    map_loading: false,
    plot_loading: false,
    timeRange: null,
    // cesium menu:
    modelScale: 1.0,
    showClickableTrajectory: false,
    showTrajectory: true,
    showWaypoints: true,
    cameraType: 'follow',
    fields: [], // holds message name
    allAxis: [0, 1, 2, 3, 4, 5, 6],
    allColors: [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467BD',
        '#8C564B']
}
