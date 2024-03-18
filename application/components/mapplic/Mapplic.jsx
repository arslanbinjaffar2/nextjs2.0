// import ReactDOM from 'react-dom/client'
import MapplicElement from './MapplicElement'
import { MapplicStore } from './MapplicStore'


const Mapplic = ({json, id, ...props}) => {
	return (
		<MapplicStore>
			<MapplicElement json={json} {...props}/>
		</MapplicStore>
	)
}

export default Mapplic

