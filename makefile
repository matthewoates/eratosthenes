main: typescript

typescript:
	tsc ts/main.ts --out main.js

run:
	firefox bin/index.html

clean:
	rm main.js
