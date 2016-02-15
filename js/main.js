var app, file = 'assets/tab_1_1.mid';

window.onload = function () {
    app = new VisuApp(20, 3, 'canvas');

    app.run();

    var colors = [[255, 0, 0],
        [255, 64, 0],
        [255, 128, 0],
        [255, 191, 0],
        [255, 255, 0],
        [191, 255, 0],
        [128, 255, 0],
        [64, 255, 0],
        [0, 255, 0],
        [0, 255, 64],
        [0, 255, 128],
        [0, 255, 191],
        [0, 255, 255],
        [0, 191, 255],
        [0, 128, 255],
        [0, 64, 255],
        [0, 0, 255],
        [64, 0, 255],
        [128, 0, 255],
        [191, 0, 255],
        [255, 0, 255],
        [255, 0, 191],
        [255, 0, 128],
        [255, 0, 64],
        [255, 0, 0]];

    MIDI.loadPlugin({
        soundfontUrl: "https://rawgit.com/gleitz/midi-js-soundfonts/master/FluidR3_GM/",
        onsuccess: function() {
            console.log('done');
            var player = MIDI.Player;
            player.loadFile(file, function () {

                var instruments = player.getFileInstruments();
                instruments.push('synth_drum');

                MIDI.loadPlugin({
                    soundfontUrl: "https://rawgit.com/gleitz/midi-js-soundfonts/master/FluidR3_GM/",
                    instruments: instruments,
                    onsuccess: function() {
                        var player = MIDI.Player;

                        player.loadFile(file, function () {
                            console.log('about to play');

                            MIDI.programChange(0, MIDI.GM.byName['distortion_guitar'].number);
                            MIDI.programChange(2, MIDI.GM.byName['distortion_guitar'].number);
                            MIDI.programChange(4, MIDI.GM.byName['electric_bass_finger'].number);
                            MIDI.programChange(6, MIDI.GM.byName['fx_4_atmosphere'].number);
                            MIDI.programChange(9, 119);
                            MIDI.programChange(10, 119);

                            player.addListener(function(data) {
                                console.log(data.channel);
                                posTop = 100 + 50 * data.channel + 650 - (data.note * 10);
                                r = colors[data.channel][0];
                                g = colors[data.channel][1];
                                b = colors[data.channel][2];

                                app.addCircle(rgba(r, g, b, 1), 25, posTop);
                            });

                            player.start();
                        });
                    }
                });
            });
        }
    });
};
