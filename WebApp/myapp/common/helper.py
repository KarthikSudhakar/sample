from flask.json import JSONEncoder as BaseJSONEncoder

class JsonSerializer(object):
    """A mixin that can be used to mark a SQLAlchemy model class which
    implements a :func:`to_json` method. The :func:`to_json` method is used
    in conjuction with the custom :class:`JSONEncoder` class. By default this
    mixin will assume all properties of the SQLAlchemy model are to be visible
    in the JSON output. Extend this class to customize which properties are
    public, hidden or modified before being being passed to the JSON serializer.
    """

    __json_public__ = None
    __json_hidden__ = None
    __json_modifiers__ = None

    def get_field_names(self):
        for p in self.__mapper__.iterate_properties: 
            yield p.key

    def to_json(self):
        field_names = self.get_field_names()

        public = self.__json_public__ or field_names
        hidden = self.__json_hidden__ or []
        modifiers = self.__json_modifiers__ or dict()

        rv = dict()
        for key in public:
        
            rv[key] = getattr(self, key)
        for key, modifier in modifiers.items():
            
            value = getattr(self, key)
            if isinstance(modifier, list):
                rv[modifier[0]] = modifier[1](value)
            else:
                rv[key] = modifier(value)
         
        for key in hidden:
            rv.pop(key, None)
        return rv