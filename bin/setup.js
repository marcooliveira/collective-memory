/*jslint node:true*/

var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	colors = require('colors'), // https://github.com/marak/colors.js
	mkdirp = require('mkdirp'), // https://github.com/substack/node-mkdirp
	i,
	total,
	red = '\033[31m',
	blue = '\033[34m',
	reset = '\033[0m',
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

function fileExists(filePath) {
    try {
		fs.statSync(filePath);
		return true;
    } catch (e) {
		return false;
    }
}

function isDirectory(dirPath) {
    try {
		console.log(">>", dirPath, fs.statSync(dirPath));
		return !!fs.statSync(dirPath).isDirectory();
    } catch (e) {
		console.log(e);
		return false;
    }
}

try {
	var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'ascii'));
} catch (e) {
	console.error(('Invalid configuration: ' + e).error + '\n');
	process.exit(1);
}


console.log('\nCreating default dirs\n'.status);

total = config.setup_dirs.length;
for (i = 0; i < total; i = i + 1) {
	destination = path.resolve(__dirname, config.setup_dirs[i]);
	tmp = destination.field + ': ';

	if (!fileExists(destination)) {
		mkdirp.sync(destination, 0744);
		console.log(tmp + 'OK'.blue);
	} else {
		console.log(tmp + 'Skipped'.warning);
	}
}



console.log('\nGenerating symbolic links...\n'.status);

total = config.setup_symlinks.length;
for (i = 0; i < total; i = i + 1) {

	source = path.resolve(__dirname, config.setup_symlinks[i].src);
	destination = path.resolve(__dirname, config.setup_symlinks[i].dst);
	console.log(destination);
	tmp = config.setup_symlinks[i].title.field + ' (' + destination.note + '): ';

	console.log('checking for ' + destination.red);
	if (!isDirectory(destination)) {

		parent_dir = destination.match(/.+[\/\\]/);
		if (!fileExists(parent_dir)) {
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