document.addEventListener('DOMContentLoaded', function() {  // Wait for DOM
  const languageSelect = document.getElementById('language');
  const generationTypeSelect = document.getElementById('generationType');
  const numberInput = document.getElementById('number');
  const outputTypeSelect = document.getElementById('outputType');
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const loremIpsumOutput = document.getElementById('lorem-ipsum-output');

  const loremLatin = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const loremBengali = "রূপকথার এক দেশে, এক সোনালী সকালে, রাজকুমারী মেঘমালা তার প্রাসাদের জানালায় দাঁড়িয়ে দূরের সবুজ পাহাড় দেখছিল। পাখির গান আর নদীর কলকল ধ্বনি তার মন ভরিয়ে তুললো। সে ভাবলো, আজ সে প্রজাপতিদের সাথে খেলবে আর ফুলের সাথে কথা বলবে।";

  generateBtn.addEventListener('click', generateLoremIpsum);
  copyBtn.addEventListener('click', copyToClipboard);
  resetBtn.addEventListener('click', resetForm);


  function generateLoremIpsum() {
    const language = languageSelect.value;
    const generationType = generationTypeSelect.value;
    const number = parseInt(numberInput.value);
    const outputType = outputTypeSelect.value;

    const lorem = (language === 'bengali') ? loremBengali : loremLatin;
    const sentences = lorem.split('.');
    const words = lorem.split(' ');
    let generatedText = '';

    switch (generationType) {
      case 'paragraphs':
        for (let i = 0; i < number; i++) {
          let paragraph = '';
          for (let j = 0; j < 5; j++) {
            paragraph += sentences[Math.floor(Math.random() * sentences.length)].trim() + '. ';
          }
          generatedText += paragraph + '\n\n';
        }
        break;
      case 'words':
        for (let i = 0; i < number; i++) {
          generatedText += words[Math.floor(Math.random() * words.length)] + ' ';
        }
        break;
      case 'characters':
        for (let i = 0; i < number; i++) {
          generatedText += lorem.charAt(Math.floor(Math.random() * lorem.length));
        }
        break;
    }

    if (outputType === "html") {
      generatedText = generatedText.replace(/\n\n/g, "<p></p>");
      generatedText = "<p>" + generatedText + "</p>";
    }

    loremIpsumOutput.textContent = generatedText;
  }

  function copyToClipboard() {
    const textToCopy = loremIpsumOutput.textContent;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Text copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert('Failed to copy text. Please select and copy manually.');
        });
    } else {
      // Fallback for older browsers (requires user selection)
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        alert('Text copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        alert('Failed to copy text. Please select and copy manually.');
      }

      document.body.removeChild(textArea);
    }
  }

  function resetForm() {
    languageSelect.value = 'latin';
    generationTypeSelect.value = 'paragraphs';
    numberInput.value = '5';
    outputTypeSelect.value = 'text';
    loremIpsumOutput.textContent = '';
  }
});
