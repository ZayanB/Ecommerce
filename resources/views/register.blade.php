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
        @foreach($errors->all() as $error )
        <div>{{$error}}</div>
        @endforeach
        @endif
    </div>

    <div>
        <form action="{{route('registerNewUser') }}" method="POST">
            @csrf
            <div>
                <label for="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname">
            </div>
            <div>
                <label for="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname">
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>
            <div>
                <label for="birthday">Birthday</label>
                <input type="date" name="birthday" id="birthday">
            </div>
            <button type="submit">Register</button>


        </form>
    </div>

</body>

</html>