{
  success: true,
  person: @person.as_json.merge(
    'photo_sm_url' => cl_small_image_path(@person.photo_url),
    'photo_md_url' => cl_medium_image_path(@person.photo_url)
  )
}
.to_json
