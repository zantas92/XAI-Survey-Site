import Camel from '../images/raw/large/Camel.jpg';
import Gorilla from '../images/raw/large/Gorilla.jpg';
import Panda3 from '../images/raw/large/Panda3.jpg';
import Toucan from '../images/raw/large/Toucan.jpg';
import Hen from '../images/raw/large/Hen.jpg';
import OstrichLGC from '../images/layerGradCam/large/OstrichLGC.png';
import CheetahLGC from '../images/layerGradCam/large/CheetahLGC.png';
import KoalaLGC from '../images/layerGradCam/large/KoalaLGC.png';
import MeerkatLGC from '../images/layerGradCam/large/MeerkatLGC.png';
import OstrichOcc from '../images/occlusion/large/OstrichOcclusion.png';
import CheetahOcc from '../images/occlusion/large/CheetahOcclusion.png';
import KoalaOcc from '../images/occlusion/large/KoalaOcclusion.png';
import MeerkatOcc from '../images/occlusion/large/MeerkatOcclusion.png';

const GetImageData = (index) => {
    var imageData = [
        [Camel, "Dromedar"],
        [Toucan, "Tukan"],
        [Gorilla, "Gorilla"],
        [Panda3, "Panda"],
        [Hen, "Höna"],
        [OstrichLGC, "Struts"],
        [CheetahLGC, "Gepard"],
        [KoalaLGC, "Koala"],
        [MeerkatLGC, "Surikat"],
        [OstrichOcc, "Struts"],
        [CheetahOcc, "Gepard"],
        [KoalaOcc, "Koala"],
        [MeerkatOcc, "Surikat"]
    ];
    return imageData[index];
}
export default GetImageData;