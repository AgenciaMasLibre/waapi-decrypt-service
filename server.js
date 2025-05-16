const express = require('express');
const multer = require('multer');
const decryptMedia = require('whatsapp-media-decrypt');
const app = express();
const upload = multer();

app.post('/decrypt', upload.single('file'), async (req, res) => {
  try {
    const mediaKey = req.body.mediaKey;
    const mediaType = req.body.mediaType || 'audio';
    const encryptedBuffer = req.file.buffer;

    const decryptedBuffer = await decryptMedia.decrypt({
      mediaKey,
      mediaType,
      mediaBuffer: encryptedBuffer,
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(decryptedBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error descifrando archivo' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
