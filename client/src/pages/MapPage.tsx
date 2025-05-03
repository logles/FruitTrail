import Header from '@/components/Header';
// import Footer from '@/components/Footer';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TREES,
  ADD_TREE,
  UPDATE_TREE,
  DELETE_TREE,
} from '@/api/treeAPI.ts';
import { useAuth } from '@/hooks/useAuth';

const containerStyle = { width: '100%', height: '100%' };
const defaultCenter = { lat: 33.4484, lng: -112.0740 };

export default function MapPage() {
  const { user } = useAuth();           // ← returns { user } or null
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  });

  const [center, setCenter] = useState(defaultCenter);
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => setCenter({ lat: coords.latitude, lng: coords.longitude }),
    () => {}
  );

  const { data, loading, refetch } = useQuery(GET_TREES);
  const [addTree]    = useMutation(ADD_TREE);
  const [updateTree] = useMutation(UPDATE_TREE);
  const [deleteTree] = useMutation(DELETE_TREE);

  const trees = data?.trees ?? [];
  const [addPos, setAddPos] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!user || !e.latLng) return;          // only logged-in users add pins
      setAddPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    },
    [user],
  );

  const markers = useMemo(
    () =>
      trees.map((t: any) => ({
        id: t._id,
        pos: { lat: t.location.latitude, lng: t.location.longitude },
        owner: user && user._id === t.createdBy._id,
        data: t,
      })),
    [trees, user],
  );

  /* ─── loading / error guards ─────────────────────────────── */
  if (loadError) return <p className="p-4 text-red-600">Map failed to load.</p>;
  if (!isLoaded || loading) return <p className="p-4">Loading…</p>;

  /* ─── render ─────────────────────────────────────────────── */
  return (
    <div>
      <Header />
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{ disableDefaultUI: true }}
      onClick={handleMapClick}
    >
      {/* existing tree markers */}
      {markers.map(m => (
        <Marker
          key={m.id}
          position={m.pos}
          onClick={() => setSelected(m.data)}
          icon={
            m.owner
              ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              : undefined
          }
        />
      ))}

      {/* add-tree form */}
      {addPos && (
        <InfoWindow position={addPos} onCloseClick={() => setAddPos(null)}>
          <AddTreeForm
            onSave={async (name, fruit) => {
              await addTree({
                variables: { name, fruit, lat: addPos.lat, lng: addPos.lng },
              });
              setAddPos(null);
              refetch();
            }}
          />
        </InfoWindow>
      )}

      {/* info window for view / edit / delete */}
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
          />
        </InfoWindow>
      )}
    </GoogleMap>
    {/* <Footer/>     */}
</div>
  );
}

/* ───────── helper components ──────────────────────────────── */
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
  tree, isOwner, onSave, onDelete,
}: {
  tree: any;
  isOwner: boolean;
  onSave: (n: string, f: string) => void;
  onDelete: () => void;
}) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(tree.name);
  const [fruit, setFruit] = useState(tree.fruit);

  if (!isOwner || !edit) {
    return (
      <div className="w-60">
        <h3 className="font-semibold">{tree.name}</h3>
        <p className="text-sm">{tree.fruit}</p>
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
