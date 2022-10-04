const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC70HUCT2PCzBnjOgZ4B4QWg&part=snippet%2Cid&order=date&maxResults=20'
//llamar el id content del html
const content = null || document.querySelector('#content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0efebad94emshc2f3d4e00d775d6p16175djsn70ef817b540e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    //transformamos la informacion
    const data = await response.json();
    return data; 
}

//funcion anonima que se incoca a si misma, permite automaticamente al cargar este archivo ejecutar la funcion
(async () => {
    try {
        const videos = await fetchData(API);
        //creamos el template, va a ser html q vamos a adaptar para q itere por cada lemento de la respuesta
        //el codigo pegado aqui es el q esta en el html comentario content
        //${videos.items.map(video =>`html` videos.items ver la API asi se entra a los items y hago un nuevo array usando map
        let view = `
        ${videos.items.map(video => `   
            <a href="https://youtube.com/watch?v=${video.id.videoId}"target="_blank">
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0, 20).join('')}
     `;
     content.innerHTML = view; //le asignamos a este id toda la vista creada en variable view
    } catch (error) {
        console.log(error);
    }
})();