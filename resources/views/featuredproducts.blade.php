<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <form method="post" action="featured">
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