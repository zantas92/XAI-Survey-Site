//large sized images
import CamelOccLarge from '../images/occlusion/large/CamelOcclusion.png';
import ToucanOccLarge from '../images/occlusion/large/ToucanOcclusion.png';
import GorillaOccLarge from '../images/occlusion/large/GorillaOcclusion.png';
import CamelLayLarge from '../images/layerGradCam/large/CamelLGC.png'; 
import ToucanLayLarge from '../images/layerGradCam/large/ToucanLGC.png'; 
import GorillaLayLarge from '../images/layerGradCam/large/GorillaLGC.png'; 
import CamelHumanLarge from '../images/human/large/Camel.png'; 
import ToucanHumanLarge from '../images/human/large/Toucan.png'; 
import GorillaHumanLarge from '../images/human/large/Gorilla.png'; 

//medium sized images
import CamelOccMedium from '../images/occlusion/medium/CamelOcclusion.png';
import ToucanOccMedium from '../images/occlusion/medium/ToucanOcclusion.png';
import GorillaOccMedium from '../images/occlusion/medium/GorillaOcclusion.png';
import CamelLayMedium from '../images/layerGradCam/medium/CamelLGC.png'; 
import ToucanLayMedium from '../images/layerGradCam/medium/ToucanLGC.png'; 
import GorillaLayMedium from '../images/layerGradCam/medium/GorillaLGC.png'; 
import CamelHumanMedium from '../images/human/medium/Camel.png'; 
import ToucanHumanMedium from '../images/human/medium/Toucan.png'; 
import GorillaHumanMedium from '../images/human/medium/Gorilla.png'; 

//Small sized images
import CamelOccSmall from '../images/occlusion/small/CamelOcclusion.png';
import ToucanOccSmall from '../images/occlusion/small/ToucanOcclusion.png';
import GorillaOccSmall from '../images/occlusion/small/GorillaOcclusion.png';
import CamelLaySmall from '../images/layerGradCam/small/CamelLGC.png'; 
import ToucanLaySmall from '../images/layerGradCam/small/ToucanLGC.png'; 
import GorillaLaySmall from '../images/layerGradCam/small/GorillaLGC.png'; 
import CamelHumanSmall from '../images/human/small/Camel.png'; 
import ToucanHumanSmall from '../images/human/small/Toucan.png'; 
import GorillaHumanSmall from '../images/human/small/Gorilla.png'; 

const GetModelImageData = () => {
    var modelImageData = [
        [CamelOccSmall, CamelOccMedium, CamelOccLarge],
        [ToucanOccSmall, ToucanOccMedium, ToucanOccLarge],
        [GorillaOccSmall, GorillaOccMedium, GorillaOccLarge],
        [CamelLaySmall, CamelLayMedium, CamelLayLarge],
        [ToucanLaySmall, ToucanLayMedium, ToucanLayLarge],
        [GorillaLaySmall, GorillaLayMedium, GorillaLayLarge],
        [CamelHumanSmall, CamelHumanMedium, CamelHumanLarge],
        [ToucanHumanSmall, ToucanHumanMedium, ToucanHumanLarge],
        [GorillaHumanSmall, GorillaHumanMedium, GorillaHumanLarge]]
        ;
    return modelImageData;
}
export default GetModelImageData;