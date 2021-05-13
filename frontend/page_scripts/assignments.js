async function init() {
	// TODO: validate user and redirect to login - use /api/webapp/userstatus endpoint
	user = await get_user();
	user.last_page = "assignments.html";
	save_data(user);
	var date_to_send = dayjs().format("MM/DD/YYYY");
	// send the request
	// TODO: figure out what the `persona` param does
	var assignment_req = await fetch(base_endpoint + user.baseurl + "/api/DataDirect/AssignmentCenterAssignments/?format=json&filter=2&dateStart=" + date_to_send + "&dateEnd=" + date_to_send + "&persona=2");
	// TODO: validate response
	var assignments_json = await assignment_req.json();
	fill_in_assignments(assignments_json);
}

function fill_in_assignments(assignments_raw) {
	var assignments = [];
	for (var assign of assignments_raw) {
		assignments.push({
			class: assign.groupname,
			assign_date: assign.date_assigned,
			due_date: assign.date_due,
			title: assign.short_description,
			type: assign.assignment_type,
			desc: assign.long_description,
			id: assign.assignment_id
		});
	}
	console.log(assignments);
	document.querySelector("#assignments").innerHTML = "";
	fill_template("assignment_template", {assignments}, "assignments", {
		noEscape: true // there is no escape. this is inevitable
	});
}
