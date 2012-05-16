/*jslint node:true*/

var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	colors = require('colors'), // https://github.com/marak/colors.js
	mkdirp = require('mkdirp'), // https://github.com/substack/node-mkdirp
	i,
	total,
	tmp,
	parent_dir,
	source,
	destination,
	type;

colors.setTheme({
	status: 'green',
	error: 'red',
	info: 'cyan',
	warning: 'yellow',
	note: 'grey',
	field: 'bold'
});

try {
	var config = JSON.parse(fs.readFileSync('config.json', 'ascii'));
} catch (e) {
	console.error(('Invalid configuration: ' + e).error + '\n');
	process.exit(1);
}


console.log('\nCreating default dirs\n'.status);

total = config.setup_dirs.length;
for (i = 0; i < total; i = i + 1) {
	destination = path.resolve('.', config.setup_dirs[i]);
	tmp = destination.field + ': ';

	if (!path.existsSync(destination)) {
		mkdirp.sync(destination, 0744);
		console.log(tmp + 'OK'.blue);
	} else {
		console.log(tmp + 'Skipped'.warning);
	}
}



console.log('\nGenerating symbolic links...\n'.status);

total = config.setup_symlinks.length;
for (i = 0; i < total; i = i + 1) {

	source = path.resolve('.', config.setup_symlinks[i].src);
	destination = path.resolve('.', config.setup_symlinks[i].dst);
	tmp = config.setup_symlinks[i].title.field + ' (' + destination.note + '): ';

	console.log('checking for ' + destination.red);
	if (!path.existsSync(destination)) {

		parent_dir = destination.match(/.+\//);
		if (!path.existsSync(parent_dir)) {
			console.log('going to create: ' + parent_dir);
			mkdirp.sync(parent_dir, 0744);
		}
		fs.symlinkSync(source, destination, type);
		console.log(tmp + 'OK'.blue);
	} else {
		console.log(tmp + 'Skipped'.warning);
	}
}


console.log('\nSetup finished successfuly'.status + "\n");