class SessionViewData {
	location:		string
	timeAndDate:	string
	instructors:	string
	participants:	string

	constructor(
		location:		string,
		timeAndDate:	string,
		instructors:	string,
		participants:	string
	) {
		this.location		= location;
		this.timeAndDate	= timeAndDate;
		this.instructors	= instructors;
		this.participants	= participants;
	}

	getLocation() {
		return this.location;
	}

	getTimeAndDate() {
		return this.timeAndDate;
	}

	getInstructors() {
		return this.instructors;
	}

	getParticipants() {
		return this.participants;
	}
}

export default SessionViewData;
