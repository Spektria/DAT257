class SessionViewData {
	location:		string
	date:			Date
	instructors:	string[]
	participants:	string[]

	constructor(
		location:		string,
		date:			Date,
		instructors:	string[],
		participants:	string[]
	) {
		this.location		= location;
		this.date			= date;
		this.instructors	= instructors;
		this.participants	= participants;
	}

	getLocation() {
		return this.location;
	}

	getDate() {
		return this.date;
	}

	getInstructors() {
		return this.instructors;
	}

	getParticipants() {
		return this.participants;
	}
}

export default SessionViewData;
