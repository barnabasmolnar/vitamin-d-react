const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g);
    }
}

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        purgecss({
            content: ['./src/**/*.js', './public/**/*.html'],
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['js', 'html']
                }
            ],
            keyframes: true
        })
    ]
};