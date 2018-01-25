/** Styles for the progress bar */
const progressBar = {
	margin: {
		left: 6,
		right: 6
	}
};

/** Width of bar */
const barWidth = 28;

/** Height of triangle pointer */
const barPointerHeight = 15;

/** The colors of the bars based on the stages */
const barColors = {
	green: '0x54bdbc',
	darkGreen: '0x43a09f',
	purple: '0x994e99',
	darkPurple: '0x773d77',
	red: '0xe94a53',
	darkRed: '0xc53c44'
};

/** The dull colors for the bars which show initially */
const dullBarColors = {
	green: '0xbcbcbc',
	darkGreen: '0x9e9e9e',
	purple: '0x959495',
	darkPurple: '0x777777',
	red: '0xeaeaea',
	darkRed: '0xc7c7c7'
};

export {
	progressBar,
	barWidth,
	barPointerHeight,
	barColors,
	dullBarColors
}