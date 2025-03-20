import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Uzyskaj ścieżkę bieżącego pliku w ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wczytaj plik segments.json
const segmentsPath = path.join(__dirname, '..', 'src', 'data', 'segments.json');
const segmentsData = JSON.parse(fs.readFileSync(segmentsPath, 'utf8'));

// Utwórz katalog segments, jeśli nie istnieje
const segmentsDirPath = path.join(__dirname, '..', 'src', 'data', 'segments');
if (!fs.existsSync(segmentsDirPath)) {
  fs.mkdirSync(segmentsDirPath, { recursive: true });
}

// Grupuj segmenty według obszarów
const segmentsByArea = {};
segmentsData.forEach(segment => {
  const areaId = segment.areaId;
  if (!segmentsByArea[areaId]) {
    segmentsByArea[areaId] = [];
  }
  segmentsByArea[areaId].push(segment);
});

// Zapisz segmenty do osobnych plików
Object.keys(segmentsByArea).forEach(areaId => {
  const areaSegments = segmentsByArea[areaId];
  const areaSegmentsPath = path.join(segmentsDirPath, `${areaId}.json`);
  fs.writeFileSync(areaSegmentsPath, JSON.stringify(areaSegments, null, 2));
  console.log(`Zapisano ${areaSegments.length} segmentów dla obszaru ${areaId} do pliku ${areaSegmentsPath}`);
});

console.log('Zakończono podział segmentów na osobne pliki.');
