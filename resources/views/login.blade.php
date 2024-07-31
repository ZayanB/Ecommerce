<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div>
        @if($errors->any())
        <div>Sorry, looks like something went wrong. Please correct the following and submit again:</div>
        @foreach($errors->all() as $error )
        <div>
            <ul>
                <li>{{$error}}</li>
            </ul>
        </div>
        @endforeach
        @endif
    </div>
    <div>
        <form action="{{route('loginUser') }}" method="POST">
            @csrf
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</body>

</html>