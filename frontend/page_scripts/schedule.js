async function init() {
	user = await get_user();
	var request = await fetch(base_endpoint + user.baseurl + "/api/schedule/MyDayCalendarStudentList");
	var data = await request.json();
	// TODO: validate response
	var schedule = [];
	for (var item of data) {
		schedule.push({
			class_name: item.CourseTitle,
			class_id: item.SectionId,
			start_time: item.MyDayStartTime,
			end_time: item.MyDayEndTime,
			block: item.Block,
			room_number: item.RoomNumber,
			building: item.BuildingName,
			contact: item.Contact,
			contact_email: item.ContactEmail,
			indicator_text: item.AttendanceDisplay,
			indicator_class: attendance_to_color(item.AttendanceInd)
		});
	}
	fill_template("schedule_template", {schedule}, "schedule_tbody");
}

function attendance_to_color(ind) {
	var indicators = {
		"1": "good"
	}
	return indicators[String(ind)];
}
