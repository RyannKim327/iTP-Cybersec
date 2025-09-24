module.exports = (time, timezone = "Asia/Manila") => {
    let a = new Date()
    if(time)
	    a = new Date(time)
	const b = new Date(a.toLocaleString('en-US', {
		timeZone: timezone
	}))
	return new Date(a.getTime() - (a.getTime() - b.getTime()))
}