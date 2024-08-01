<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <form method="post" action="ftrd">
            @csrf
            <label for="category">category:</label>
            <select id="category" name="category">
                <option value="artDecor">Art + Decor</option>
                <option value="cases + docks">Cases & Docks</option>
                <option value="cosmetic">cosmetic</option>
                <option value="fashion">fashion</option>
                <option value="furniture">furniture</option>
                <option value="jewelry">jewelry</option>
                <option value="pottery">pottery</option>
            </select>

            <button type="submit">Submit</button>
        </form>

        <form method="post" action="ftrdd">
            @csrf
            <label for="criteria">Criteria:</label>
            <select id="criteria" name="criteria">
                <option value="default">Default</option>
                <option value="new_arrivals">New Arrivals</option>
                <option value="our_favorites">Our Favorites</option>
            </select>

            <label for="limit">Limit:</label>
            <input type="number" id="limit" name="limit" min="1" max="6">

            <button type="submit">Submit</button>
        </form>
    </div>
</body>

</html>