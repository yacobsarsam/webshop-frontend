const EditProduct = () => {
    return (
        <div>
            <h1>Edit Product</h1>
            <form>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
export default EditProduct;