/*jslint node:true*/
var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	colors = require('colors'),
	i,
	total,
	red = '\033[31m',
	blue = '\033[34m',
	reset = '\033[0m',
	tmp;

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
	tmp = path.resolve('.', config.setup_dirs[i]).field + ': ';
	if (!path.existsSync(config.setup_symlinks[i].dst)) {
		fs.mkdirSync(config.setup_dirs[i], 0744);
		console.log(tmp + 'OK'.blue);
	} else {
		console.log(tmp + 'Skipped'.warning);
	}
}



console.log('\nGenerating symbolic links...\n'.status);

total = config.setup_symlinks.length;
for (i = 0; i < total; i = i + 1) {
	tmp = config.setup_symlinks[i].title.field + ' (' + path.resolve('.', config.setup_symlinks[i].dst).note + '): ';
	if (!path.existsSync(config.setup_symlinks[i].dst)) {
		fs.symlinkSync(config.setup_symlinks[i].src, config.setup_symlinks[i].dst, config.setup_symlinks[i].type);
		console.log(tmp + 'OK'.blue);
	} else {
		console.log(tmp + 'Skipped'.warning);
	}
}


console.log('\nSetup finished successfuly'.status + "\n");