export default _ => {

	if (!window.console) return

	// Define your custom commands and emoji
	const commands = [
		["beer", "🍺"],
		["poo", "💩"],
		["bs", "👾"]
	]

	// Create custom commands
	commands.forEach(command => {

		window.console[command[0]] = function(){

			// Get arguments as a string
			const args = Array.prototype.slice.call(arguments).toString().split(',').join(', ')

			// Log to the console with emoji
			console.log(`${command[1]} ${args}`)

		}

	})
	

}