//  <Header/> component that render on both the login and signup pages for quick information and navigation
import {Link} from 'react-router-dom';
import logo from "../../assets/Bedaya.png"

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    style={{width: "17rem", height: "17em"}}
                    className="rounded-full"

                    src={logo}
                    />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-sky-600 hover:text-sky-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}