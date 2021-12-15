module.exports = {
	// I thought this was what I would need to add for making the changes, based on the docs
	plugins: ['@babel/plugin-transform-modules-commonjs'],

	// env takes care of the majority of changes I might need to convert code to make
	// easy to run on a wider range of machines
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					// target an older version where I know there is no ESM support
					node: '10'
				}
			}
		]
	],
	// this was in the docs too - I'm not sure if  I need it TBH
	sourceType: 'module'
}
