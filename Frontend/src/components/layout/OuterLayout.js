import Style from './OuterLayout.module.css';

function OuterLayout(props) {
    return (
        <div className={Style.container}>
            {props.children}
        </div>
    )
};

export default OuterLayout;