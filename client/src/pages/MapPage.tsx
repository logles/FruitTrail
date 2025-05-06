import { useState, useEffect, useCallback } from 'react';
import { Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TREES,
  ADD_TREE,
  UPDATE_TREE,
  DELETE_TREE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '@/api/treeAPI.ts';
import { GET_ME } from '@/api/userAPI.ts';
import { useAuth } from '@/hooks/useAuth';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import Header from '@/components/Header';


const containerStyle = { width: '100vw', height: '100vh' };
const defaultCenter = { lat: 33.4484, lng: -112.0740 };

export default function MapPage() {
  const auth = useAuth();
  const { data: userData, refetch: refetchUser } = useQuery(GET_ME);
  const user = userData?.me || auth.user;

  const [center, setCenter] = useState(defaultCenter);
  const [addPos, setAddPos] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCenter({ lat: coords.latitude, lng: coords.longitude }),
      () => {}
    );
  }, []);

  const { data, loading, refetch } = useQuery(GET_TREES);
  const [addTree] = useMutation(ADD_TREE);
  const [updateTree] = useMutation(UPDATE_TREE);
  const [deleteTree] = useMutation(DELETE_TREE);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  const trees = data?.trees ?? [];

  const handleMapClick = useCallback(
    (event: any) => {
      const lat = event.detail?.latLng?.lat;
      const lng = event.detail?.latLng?.lng;
      if (typeof lat !== 'number' || typeof lng !== 'number') return;
      setAddPos({ lat, lng });
    },
    []
  );

  if (loading) return <p className="p-4">Loading…</p>;

  return (
    <div>
      <Header />
      <Map
        style={containerStyle}
        defaultCenter={center}
        defaultZoom={12}
        onClick={handleMapClick}
      >
        {trees.map((t: any) => (
          <Marker
            key={t._id}
            position={{ lat: t.location.latitude, lng: t.location.longitude }}
            onClick={() => setSelected(t)}
            icon={
              user && user._id === t.createdBy._id
                ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                : null
            }
          />
        ))}

        {addPos && (
          <InfoWindow position={addPos} onCloseClick={() => setAddPos(null)}>
            <AddTreeForm
              onSave={async (name, fruit) => {
                try {
                  const response = await addTree({
                    variables: { name, fruit, lat: addPos.lat, lng: addPos.lng },
                  });

                  if (response.data?.addTree) {
                    console.log('Tree added:', response.data.addTree);
                  } else {
                    console.error('Tree not added — no data returned.');
                  }
                } catch (err) {
                  console.error('Failed to add tree:', err);
                }

                setAddPos(null);
                refetch();
              }}
            />
          </InfoWindow>
        )}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.location.latitude,
              lng: selected.location.longitude,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <TreeCard
              tree={selected}
              isOwner={user && user._id === selected.createdBy._id}
              onSave={async (name, fruit) => {
                await updateTree({ variables: { id: selected._id, name, fruit } });
                setSelected(null);
                refetch();
              }}
              onDelete={async () => {
                await deleteTree({ variables: { id: selected._id } });
                setSelected(null);
                refetch();
              }}
              onFavorite={async (treeId: string, isFavorited: boolean) => {
                try {
                  if (isFavorited) {
                    await removeFavorite({ variables: { treeId } });
                  } else {
                    await addFavorite({ variables: { treeId } });
                  }
                  refetchUser();
                } catch (err) {
                  console.error('Favorite toggle failed:', err);
                }
              }}
              user={user}
            />
          </InfoWindow>
        )}
      </Map>
      <ControlPanel />
    </div>
  );
}


function AddTreeForm({ onSave }: { onSave: (n: string, f: string) => void }) {
  const [name, setName] = useState('');
  const [fruit, setFruit] = useState('');
  return (
    <div className="flex flex-col gap-2 w-56">
      <input className="border p-1 text-sm" placeholder="Tree name"
        value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-1 text-sm" placeholder="Fruit type"
        value={fruit} onChange={e => setFruit(e.target.value)} />
      <button onClick={() => onSave(name, fruit)}
        className="bg-green-600 text-white rounded py-1 text-sm">Save</button>
    </div>
  );
}

function TreeCard({
  tree, isOwner, onSave, onDelete, onFavorite, user
}: {
  tree: any;
  isOwner: boolean;
  onSave: (n: string, f: string) => void;
  onDelete: () => void;
  onFavorite: (treeId: string, isFavorited: boolean) => void;
  user: any;
}) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(tree.name);
  const [fruit, setFruit] = useState(tree.fruit);

  const isFavorited = user?.favorites?.some((fav: any) => fav._id === tree._id);

  if (!isOwner || !edit) {
    return (
      <div className="w-60">
        <h3 className="font-semibold">{tree.name}</h3>
        <p className="text-sm">{tree.fruit}</p>
        {user && (
          <button
            className="text-yellow-500 text-sm"
            onClick={() => onFavorite(tree._id, isFavorited)}
          >
            {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
          </button>
        )}
        {isOwner && (
          <div className="flex gap-3 mt-2">
            <button onClick={() => setEdit(true)}
              className="text-blue-600 text-sm">Edit</button>
            <button onClick={onDelete}
              className="text-red-600 text-sm">Delete</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-60">
      <input className="border p-1 text-sm"
        value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-1 text-sm"
        value={fruit} onChange={e => setFruit(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={() => { onSave(name, fruit); }}
          className="bg-blue-600 text-white rounded px-2 py-1 text-sm">Save</button>
        <button onClick={() => setEdit(false)}
          className="text-gray-500 text-sm">Cancel</button>
      </div>
    </div>
  );
}
