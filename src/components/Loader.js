import * as React from "react";
import {
  CModal
} from '@coreui/react'
import Loader from "react-loader";

export default function SignIn(props) {
  const [loaded, setLoaded] = React.useState(false);
  //const { loaded }
  return (
        <CModal 
              show={loaded} 
              onClose={() => setLoaded(!loaded)}
              //color="info"
              closeOnBackdrop={false}
              
              style={{height:'80vh',backgroundColor:'transparent',border:0}}
              
            >
              
              <Loader
                loaded={!loaded}
                lines={30}
                length={40}
                width={1}
                radius={50}
                corners={0}
                rotate={0}
                direction={1}
                color="#3399ff"
                speed={2}
                trail={100}
                fps= {120}
                shadow={false}
                hwaccel={false}
                className="spinner"
                zIndex={2e9}
                top="50%"
                left="50%"
                scale={1.0}
                loadedClassName="loadedContent"
                position= {'absolute'}
              />
             
            </CModal>
      
  );
}
