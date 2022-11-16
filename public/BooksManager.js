
// window.BooksManager = () => {
//     return (<div>Books Manager Component</div>);
// }

// // export default BooksManager;


window.BooksManager = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <h1>Books Manager Component</h1>
        );
    }
});