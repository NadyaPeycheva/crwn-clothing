import {BackgroundImage,Body,DirectoryItemContainer} from './directory-item.style.jsx';
import { useNavigate } from 'react-router-dom';

const directoryItem=({category})=>{
  const {imageUrl,title,route} = category;
  const navigate = useNavigate;

  const onNavigateHandler=()=>navigate(route)
return(
<DirectoryItemContainer onClick={onNavigateHandler}>
    <BackgroundImage 
    imageUrl={imageUrl}
     />
    <Body>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </Body>
    </DirectoryItemContainer>
)
}
export default directoryItem;